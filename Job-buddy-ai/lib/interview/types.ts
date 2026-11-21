// lib/interview/types.ts
// TypeScript interfaces for the Interview Preparation feature

export type QuestionDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type InterviewQuestion = {
  id: string;
  question: string;
  answer: string;
  difficulty: QuestionDifficulty;
  tags: string[];
  followUp?: string;
  tip?: string;
};

export type InterviewTopic = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string; // tailwind gradient class
  questionCount: number;
  difficulty: QuestionDifficulty;
  tags: string[];
  questions: InterviewQuestion[];
};

export type InterviewRole = {
  id: string;
  slug: string;
  title: string;
  emoji: string;
  topicIds: string[]; // references topic slugs
  description: string;
};

export type MockInterviewSession = {
  id: string;
  userId: string;
  topicSlug: string;
  topicTitle: string;
  questions: InterviewQuestion[];
  answers: Record<string, string>; // questionId -> user's written answer
  feedback: Record<string, AIQuestionFeedback>; // questionId -> AI feedback
  overallScore: number; // 0-100
  overallFeedback: string;
  strengths: string[];
  improvements: string[];
  startedAt: string;
  completedAt?: string;
  status: "in_progress" | "completed";
};

export type AIQuestionFeedback = {
  score: number; // 0-10
  isCorrect: boolean;
  feedback: string;
  keyPoints: string[];
  missedConcepts: string[];
  betterAnswer: string;
};
