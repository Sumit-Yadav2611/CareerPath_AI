export type TestQuestion = {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  skill: string;
};

export type CareerTest = {
  id: string;
  slug: string;
  title: string;
  category: "Frontend" | "Backend" | "Full Stack" | "Python & DSA" | "Data Science & AI" | "DevOps & Cloud";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  passingScore: number; // percentage, e.g. 70
  skillsCovered: string[];
  questions: TestQuestion[];
  isPublished?: boolean;
};

export type SkillEvaluation = {
  skill: string;
  score: number; // 0-100
  status: "Mastered" | "Proficient" | "Needs Practice" | "Critical Gap";
  feedback: string;
};

export type QuestionInsight = {
  questionId: number;
  status: "correct" | "incorrect";
  userAnswerText: string;
  correctAnswerText: string;
  keyLearning: string;
};

export type AIAnalysisReport = {
  summary: string;
  careerReadinessScore: number; // 0-100
  readinessLevel: "Job Ready" | "Near Ready" | "Developing" | "Beginner";
  strengths: string[];
  weaknesses: string[];
  skillBreakdown: SkillEvaluation[];
  actionableRecommendations: string[];
  careerAdvice: string;
  questionInsights: QuestionInsight[];
};

export type TestAttempt = {
  id: string;
  userId: string;
  testId?: string | null;
  testTitle: string;
  category: string;
  difficulty: string;
  score: number; // 0-100
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
  userAnswers: Record<number, number>; // { [questionId]: selectedOptionIndex }
  questionsSnapshot: TestQuestion[];
  aiAnalysis: AIAnalysisReport;
  status: "completed" | "in_progress";
  completedAt: string;
  createdAt: string;
};

export type StudentOverallProgress = {
  totalTestsTaken: number;
  averageScore: number;
  highestScore: number;
  testsPassed: number;
  averageReadinessScore: number;
  overallReadinessTier: "Job Ready" | "Near Ready" | "Developing" | "Beginner";
  skillsMastery: {
    skill: string;
    averageScore: number;
    testsCount: number;
    status: "Mastered" | "Proficient" | "Needs Practice";
  }[];
  recentAttempts: TestAttempt[];
};
