// lib/interview/mockInterviewAI.ts
// AI-powered mock interview session evaluator

import type { InterviewQuestion, AIQuestionFeedback, MockInterviewSession } from "./types";

const { GoogleGenAI } = require("@google/genai");

type EvaluateAnswersInput = {
  topicTitle: string;
  questions: InterviewQuestion[];
  answers: Record<string, string>;
};

type EvaluationResult = {
  feedback: Record<string, AIQuestionFeedback>;
  overallScore: number;
  overallFeedback: string;
  strengths: string[];
  improvements: string[];
};

export async function evaluateMockInterviewAnswers(
  input: EvaluateAnswersInput
): Promise<EvaluationResult> {
  const { topicTitle, questions, answers } = input;

  // Build the Q&A pairs to evaluate
  const qaText = questions
    .map((q, i) => {
      const userAnswer = answers[q.id] || "(no answer provided)";
      return `Q${i + 1}: ${q.question}\nCorrect Answer: ${q.answer}\nUser's Answer: ${userAnswer}`;
    })
    .join("\n\n---\n\n");

  const prompt = `You are an expert technical interviewer evaluating a candidate's performance in a mock interview.

Topic: ${topicTitle}

Here are the questions, correct answers, and the candidate's answers:

${qaText}

Evaluate each question answer and return a JSON object with this exact structure:
{
  "questionFeedback": [
    {
      "questionId": "the question id",
      "score": 7,
      "isCorrect": true,
      "feedback": "Brief specific feedback on this answer",
      "keyPoints": ["point 1 they got right", "point 2"],
      "missedConcepts": ["concept they missed"],
      "betterAnswer": "A concise improved version of their answer"
    }
  ],
  "overallScore": 72,
  "overallFeedback": "2-3 sentence overall assessment",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["area 1 to improve", "area 2", "area 3"]
}

Question IDs in order: ${questions.map((q) => q.id).join(", ")}

Be honest but encouraging. Score each answer 0-10. Overall score 0-100.
Return ONLY the JSON, no markdown code blocks.`;

  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error("No Gemini API key");

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
        maxOutputTokens: 3000,
      },
    });

    const rawText = response.text?.trim() ?? "";
    const cleaned = rawText.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    const parsed = JSON.parse(cleaned);

    const feedbackMap: Record<string, AIQuestionFeedback> = {};
    for (const item of parsed.questionFeedback ?? []) {
      feedbackMap[item.questionId] = {
        score: item.score ?? 5,
        isCorrect: item.isCorrect ?? false,
        feedback: item.feedback ?? "",
        keyPoints: item.keyPoints ?? [],
        missedConcepts: item.missedConcepts ?? [],
        betterAnswer: item.betterAnswer ?? "",
      };
    }

    return {
      feedback: feedbackMap,
      overallScore: parsed.overallScore ?? 60,
      overallFeedback: parsed.overallFeedback ?? "Good attempt!",
      strengths: parsed.strengths ?? [],
      improvements: parsed.improvements ?? [],
    };
  } catch {
    // Heuristic fallback
    return generateHeuristicFeedback(questions, answers);
  }
}

function generateHeuristicFeedback(
  questions: InterviewQuestion[],
  answers: Record<string, string>
): EvaluationResult {
  const feedbackMap: Record<string, AIQuestionFeedback> = {};
  let totalScore = 0;

  for (const q of questions) {
    const userAnswer = answers[q.id] || "";
    const wordCount = userAnswer.split(/\s+/).filter(Boolean).length;

    // Simple heuristic: longer, more detailed answers score higher
    let score = 0;
    if (wordCount >= 60) score = 7;
    else if (wordCount >= 30) score = 5;
    else if (wordCount >= 10) score = 3;
    else if (wordCount > 0) score = 1;

    totalScore += score;

    feedbackMap[q.id] = {
      score,
      isCorrect: score >= 6,
      feedback:
        wordCount < 10
          ? "Your answer was too brief. Try to elaborate with examples."
          : wordCount < 30
            ? "Good start! Add more technical depth and specific examples."
            : "Solid answer! Review the reference answer to see if you missed any key points.",
      keyPoints: [],
      missedConcepts: [],
      betterAnswer: q.answer,
    };
  }

  const avg = questions.length > 0 ? Math.round((totalScore / (questions.length * 10)) * 100) : 0;

  return {
    feedback: feedbackMap,
    overallScore: avg,
    overallFeedback: `You scored ${avg}/100 on this mock interview. ${avg >= 70 ? "Great performance!" : avg >= 50 ? "Decent attempt — review the missed concepts." : "Keep practicing — focus on the reference answers."}`,
    strengths: avg >= 70 ? ["Detailed answers", "Technical vocabulary", "Structured responses"] : ["Attempted all questions"],
    improvements: ["Add more specific examples", "Cover edge cases", "Use technical terminology precisely"],
  };
}
