import { GoogleGenAI } from "@google/genai";
import { CareerTest, TestQuestion } from "./types";

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  try {
    return new GoogleGenAI({ apiKey });
  } catch {
    return null;
  }
}

function generateFallbackQuestions(topic: string, count: number): TestQuestion[] {
  const cleanTopic = topic.trim() || "Software Engineering";
  const defaultQuestions: TestQuestion[] = [
    {
      id: 1,
      question: `What is a fundamental best practice when designing scalable architectures in ${cleanTopic}?`,
      options: [
        `Hardcoding configuration parameters directly into source files`,
        `Separating concerns, decoupling state, and establishing clear module boundaries`,
        `Disabling error logging to improve execution speed`,
        `Relying on synchronous blocking calls across all services`,
      ],
      correctAnswer: 1,
      explanation:
        `Decoupling and modular separation of concerns are critical architectural pillars in modern ${cleanTopic} applications to ensure testability and maintainability.`,
      skill: cleanTopic,
    },
    {
      id: 2,
      question: `In ${cleanTopic}, how should unexpected runtime exceptions and edge cases be handled?`,
      options: [
        `Silently swallow errors with empty catch blocks`,
        `Catch errors at appropriate boundaries, log actionable context, and degrade gracefully`,
        `Force-restart the entire server immediately on any warning`,
        `Display internal system stack traces directly to end users`,
      ],
      correctAnswer: 1,
      explanation:
        `Robust error handling requires structured logging and graceful degradation without exposing sensitive internal stack traces or leaving the system in an inconsistent state.`,
      skill: `${cleanTopic} Reliability`,
    },
    {
      id: 3,
      question: `Which approach is most effective for optimizing performance bottlenecks in ${cleanTopic}?`,
      options: [
        `Prematurely refactoring code before profiling or measuring baseline metrics`,
        `Profiling execution with metrics and benchmarks, then optimizing the most critical hotspots`,
        `Increasing server CPU without investigating query or computational complexity`,
        `Removing all automated tests to increase build throughput`,
      ],
      correctAnswer: 1,
      explanation:
        `Measurement and profiling should always precede optimization. Identifying actual hotspots prevents wasted effort and unnecessary architectural complexity.`,
      skill: `${cleanTopic} Performance`,
    },
    {
      id: 4,
      question: `What is the role of automated unit and integration tests in ${cleanTopic} development workflows?`,
      options: [
        `To slow down releases and increase code size`,
        `To catch regressions early, validate requirements, and enable confident refactoring`,
        `To replace static type checking completely`,
        `They are only needed for legacy codebases`,
      ],
      correctAnswer: 1,
      explanation:
        `Automated testing suites ensure features adhere to requirements and protect against regressions during continuous deployment.`,
      skill: `${cleanTopic} Testing`,
    },
    {
      id: 5,
      question: `When deploying updates to a production ${cleanTopic} system, what reduces downtime risk the most?`,
      options: [
        `Deploying directly to production during peak user traffic hours`,
        `Using automated CI/CD pipelines with staged rollouts (Canary or Blue-Green) and health checks`,
        `Disabling database backups to accelerate migrations`,
        `Modifying code directly on production machines via SSH`,
      ],
      correctAnswer: 1,
      explanation:
        `Staged deployments and automated rollback triggers isolate errors and maintain high availability during releases.`,
      skill: `${cleanTopic} Deployment`,
    },
  ];

  return defaultQuestions.slice(0, count);
}

export async function generateCustomAITest(params: {
  topic: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  questionCount?: number;
}): Promise<CareerTest> {
  const { topic, difficulty = "Intermediate", questionCount = 5 } = params;
  const count = Math.min(10, Math.max(3, questionCount));
  const testId = `custom-${Date.now()}`;
  const slug = `custom-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;

  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `
You are CareerPath's AI Test Question Generator.
Generate a realistic, high-quality technical multiple-choice test for a student.

TOPIC: ${topic}
DIFFICULTY: ${difficulty}
NUMBER OF QUESTIONS: ${count}

REQUIREMENTS:
- Each question must be clear, practical, and test real-world developer or student knowledge.
- Include 4 plausible options for each question.
- Mark the 0-based index of the correct answer.
- Provide a clear explanation of why that answer is correct.
- Specify the specific sub-skill being tested (e.g. "Hooks", "Async", "Memory", "Query Optimization").
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              skillsCovered: {
                type: "array",
                items: { type: "string" },
              },
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    question: { type: "string" },
                    options: {
                      type: "array",
                      items: { type: "string" },
                    },
                    correctAnswer: { type: "integer" },
                    explanation: { type: "string" },
                    skill: { type: "string" },
                  },
                  required: ["id", "question", "options", "correctAnswer", "explanation", "skill"],
                },
              },
            },
            required: ["title", "description", "skillsCovered", "questions"],
          },
        },
      });

      if (response?.text) {
        const parsed = JSON.parse(response.text);
        if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          const formattedQuestions: TestQuestion[] = parsed.questions.map(
            (q: any, index: number) => ({
              id: index + 1,
              question: q.question,
              options: Array.isArray(q.options) && q.options.length === 4 ? q.options : [
                q.options?.[0] || "Option A",
                q.options?.[1] || "Option B",
                q.options?.[2] || "Option C",
                q.options?.[3] || "Option D",
              ],
              correctAnswer: typeof q.correctAnswer === "number" && q.correctAnswer >= 0 && q.correctAnswer < 4 ? q.correctAnswer : 0,
              explanation: q.explanation || "Correct option selected.",
              skill: q.skill || topic,
            })
          );

          return {
            id: testId,
            slug,
            title: parsed.title || `${topic} Assessment`,
            category: "Full Stack",
            difficulty,
            description: parsed.description || `AI-generated assessment for ${topic} at ${difficulty} level.`,
            durationMinutes: Math.max(10, Math.round(count * 2)),
            totalQuestions: formattedQuestions.length,
            passingScore: 70,
            skillsCovered: parsed.skillsCovered || [topic],
            questions: formattedQuestions,
          };
        }
      }
    } catch (err) {
      console.warn("AI Custom test generation fell back to heuristic template:", err);
    }
  }

  // Fallback test
  const fallbackQuestions = generateFallbackQuestions(topic, count);
  return {
    id: testId,
    slug,
    title: `${topic} Skill Assessment`,
    category: "Full Stack",
    difficulty,
    description: `Personalized evaluation covering core concepts, best practices, and architecture in ${topic}.`,
    durationMinutes: Math.max(10, Math.round(count * 2)),
    totalQuestions: fallbackQuestions.length,
    passingScore: 70,
    skillsCovered: [topic, "Architecture", "Best Practices"],
    questions: fallbackQuestions,
  };
}
