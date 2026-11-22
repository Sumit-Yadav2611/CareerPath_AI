import { GoogleGenAI } from "@google/genai";
import { AIAnalysisReport, QuestionInsight, SkillEvaluation, TestQuestion } from "./types";

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  try {
    return new GoogleGenAI({ apiKey });
  } catch {
    return null;
  }
}

function determineReadinessLevel(score: number): "Job Ready" | "Near Ready" | "Developing" | "Beginner" {
  if (score >= 85) return "Job Ready";
  if (score >= 70) return "Near Ready";
  if (score >= 50) return "Developing";
  return "Beginner";
}

/**
 * Fallback heuristic analysis generator when Gemini API is offline or unreachable
 */
function generateHeuristicAnalysis(
  testTitle: string,
  category: string,
  difficulty: string,
  questions: TestQuestion[],
  userAnswers: Record<number, number>,
  score: number
): AIAnalysisReport {
  const readinessLevel = determineReadinessLevel(score);
  const readinessScore = Math.min(100, Math.max(10, Math.round(score * 0.95 + (score >= 70 ? 5 : 0))));

  const skillBuckets: Record<string, { total: number; correct: number }> = {};
  const questionInsights: QuestionInsight[] = [];
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  for (const q of questions) {
    const userSelected = userAnswers[q.id];
    const isCorrect = userSelected === q.correctAnswer;
    const userAnswerText = typeof userSelected === "number" && q.options[userSelected]
      ? q.options[userSelected]
      : "Not answered";
    const correctAnswerText = q.options[q.correctAnswer] || "Correct option";

    if (!skillBuckets[q.skill]) {
      skillBuckets[q.skill] = { total: 0, correct: 0 };
    }
    skillBuckets[q.skill].total += 1;
    if (isCorrect) {
      skillBuckets[q.skill].correct += 1;
    }

    questionInsights.push({
      questionId: q.id,
      status: isCorrect ? "correct" : "incorrect",
      userAnswerText,
      correctAnswerText,
      keyLearning: q.explanation,
    });
  }

  const skillBreakdown: SkillEvaluation[] = Object.entries(skillBuckets).map(([skill, stat]) => {
    const skillScore = Math.round((stat.correct / stat.total) * 100);
    let status: SkillEvaluation["status"] = "Needs Practice";
    let feedback = `Review fundamental principles of ${skill}.`;

    if (skillScore === 100) {
      status = "Mastered";
      feedback = `Outstanding grasp of ${skill} concepts and production scenarios.`;
      strengths.push(`${skill} (${skillScore}%)`);
    } else if (skillScore >= 70) {
      status = "Proficient";
      feedback = `Solid working knowledge of ${skill} with minor areas for refinement.`;
      strengths.push(`${skill} (${skillScore}%)`);
    } else if (skillScore >= 40) {
      status = "Needs Practice";
      feedback = `Demonstrates basic understanding of ${skill}, but requires deeper practice on edge cases.`;
      weaknesses.push(`${skill} (${skillScore}%)`);
    } else {
      status = "Critical Gap";
      feedback = `Key concepts in ${skill} should be prioritized in your study roadmap.`;
      weaknesses.push(`${skill} (${skillScore}%)`);
    }

    return {
      skill,
      score: skillScore,
      status,
      feedback,
    };
  });

  if (strengths.length === 0) {
    strengths.push("Foundational knowledge and dedication to testing your abilities");
  }
  if (weaknesses.length === 0) {
    weaknesses.push("Advanced edge-case scenarios and high-scale optimization patterns");
  }

  let summary = "";
  let careerAdvice = "";
  const actionableRecommendations: string[] = [];

  if (score >= 80) {
    summary = `Excellent performance! You scored ${score}% on the ${testTitle} assessment (${difficulty} level). You have demonstrated solid technical proficiency and strong problem-solving capabilities in this domain.`;
    careerAdvice = `Your score indicates strong readiness for ${category} roles. Highlight the tested competencies in your resume and showcase relevant GitHub projects during technical interviews.`;
    actionableRecommendations.push(
      `Solidify your portfolio by implementing advanced architecture patterns like micro-frontends or distributed caching.`,
      `Conduct mock technical interviews to practice explaining your architectural tradeoffs verbally.`,
      `Apply to mid-level and junior-to-mid ${category} positions with confidence.`
    );
  } else if (score >= 60) {
    summary = `Good progress! You scored ${score}% on the ${testTitle} assessment. You have a solid foundational base in ${category}, with specific topics requiring targeted review before high-stakes technical interviews.`;
    careerAdvice = `You are near job readiness. Focusing on your weaker areas (${weaknesses.slice(0, 2).join(", ") || "core concepts"}) over the next 2-3 weeks will significantly boost your interview pass rate.`;
    actionableRecommendations.push(
      `Dedicate hands-on practice to ${weaknesses[0] || "your lowest-scoring topics"} by building a focused proof-of-concept project.`,
      `Carefully review the question explanations in this report to solidify theoretical principles.`,
      `Retake this test in 7 days to measure knowledge retention and track improvement.`
    );
  } else {
    summary = `Assessment completed. You scored ${score}% on the ${testTitle} assessment. This test identified important foundational areas in ${category} to focus on for your career progression.`;
    careerAdvice = `Do not be discouraged—identifying skill gaps early is the fastest path to mastery. Build structured learning projects and review core documentation before taking on technical screening interviews.`;
    actionableRecommendations.push(
      `Review core documentation and official guides for ${weaknesses.slice(0, 3).join(", ") || category}.`,
      `Build small, focused coding exercises addressing each missed question concept.`,
      `Re-attempt this assessment after reviewing the explanations below.`
    );
  }

  return {
    summary,
    careerReadinessScore: readinessScore,
    readinessLevel,
    strengths,
    weaknesses,
    skillBreakdown,
    actionableRecommendations,
    careerAdvice,
    questionInsights,
  };
}

export async function analyzeTestProgress(params: {
  testTitle: string;
  category: string;
  difficulty: string;
  questions: TestQuestion[];
  userAnswers: Record<number, number>;
  score: number;
  timeSpentSeconds: number;
}): Promise<AIAnalysisReport> {
  const { testTitle, category, difficulty, questions, userAnswers, score, timeSpentSeconds } = params;

  // Always generate heuristic baseline first to guarantee speed & reliability
  const baseline = generateHeuristicAnalysis(testTitle, category, difficulty, questions, userAnswers, score);

  const ai = getGeminiClient();
  if (!ai) {
    return baseline;
  }

  try {
    const questionReview = questions.map((q) => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.correctAnswer;
      return {
        id: q.id,
        question: q.question,
        skill: q.skill,
        isCorrect,
        selectedAnswer: typeof selected === "number" ? q.options[selected] : "Unanswered",
        correctAnswer: q.options[q.correctAnswer],
        explanation: q.explanation,
      };
    });

    const prompt = `
You are CareerPath's advanced AI Career & Skill Assessment Evaluator.
Analyze this student's completed test attempt and generate a personalized, high-value career progress report.

TEST DETAILS:
- Title: ${testTitle}
- Domain / Category: ${category}
- Difficulty: ${difficulty}
- Final Score: ${score}% (${questionReview.filter((q) => q.isCorrect).length} of ${questions.length} correct)
- Time Taken: ${Math.round(timeSpentSeconds / 60)} minutes

DETAILED QUESTION BREAKDOWN:
${JSON.stringify(questionReview, null, 2)}

Provide an insightful, constructive, and empowering analysis in the requested JSON schema.
- Identify real strengths and mastery points demonstrated by correct answers.
- Highlight specific concepts where mistakes occurred and diagnose the likely misconception.
- Give concrete, actionable advice, project suggestions, and a realistic career readiness score (0-100).
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            careerReadinessScore: { type: "number" },
            readinessLevel: {
              type: "string",
              enum: ["Job Ready", "Near Ready", "Developing", "Beginner"],
            },
            strengths: {
              type: "array",
              items: { type: "string" },
            },
            weaknesses: {
              type: "array",
              items: { type: "string" },
            },
            skillBreakdown: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  skill: { type: "string" },
                  score: { type: "number" },
                  status: {
                    type: "string",
                    enum: ["Mastered", "Proficient", "Needs Practice", "Critical Gap"],
                  },
                  feedback: { type: "string" },
                },
                required: ["skill", "score", "status", "feedback"],
              },
            },
            actionableRecommendations: {
              type: "array",
              items: { type: "string" },
            },
            careerAdvice: { type: "string" },
          },
          required: [
            "summary",
            "careerReadinessScore",
            "readinessLevel",
            "strengths",
            "weaknesses",
            "skillBreakdown",
            "actionableRecommendations",
            "careerAdvice",
          ],
        },
      },
    });

    if (response?.text) {
      const parsed = JSON.parse(response.text) as Partial<AIAnalysisReport>;
      return {
        summary: parsed.summary || baseline.summary,
        careerReadinessScore: typeof parsed.careerReadinessScore === "number" ? parsed.careerReadinessScore : baseline.careerReadinessScore,
        readinessLevel: parsed.readinessLevel || baseline.readinessLevel,
        strengths: parsed.strengths && parsed.strengths.length > 0 ? parsed.strengths : baseline.strengths,
        weaknesses: parsed.weaknesses && parsed.weaknesses.length > 0 ? parsed.weaknesses : baseline.weaknesses,
        skillBreakdown: parsed.skillBreakdown && parsed.skillBreakdown.length > 0 ? parsed.skillBreakdown : baseline.skillBreakdown,
        actionableRecommendations: parsed.actionableRecommendations && parsed.actionableRecommendations.length > 0 ? parsed.actionableRecommendations : baseline.actionableRecommendations,
        careerAdvice: parsed.careerAdvice || baseline.careerAdvice,
        questionInsights: baseline.questionInsights,
      };
    }
  } catch (error) {
    console.warn("Gemini AI test evaluation fell back to heuristic engine:", error);
  }

  return baseline;
}
