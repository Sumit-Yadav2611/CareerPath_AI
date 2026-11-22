# CareerPath AI — AI Resume & Career Intelligence Engine

This folder contains the core artificial intelligence pipelines powering **CareerPath AI**, driven by Google Gemini 2.5 Flash / Pro.

## Structure

```text
ai-resume/
├── resume/
│   ├── extractText.ts       # Multi-format text extraction (PDF via pdf2json, DOCX via mammoth)
│   └── analyzeResume.ts     # Gemini AI resume parsing, ATS scoring, skills & projects extraction
├── interview/
│   ├── topics.ts            # 360+ curated AI, ML, LLM, and Software Engineering interview questions
│   ├── mockInterviewAI.ts   # Interactive AI mock interviewer with real-time scoring & model answers
│   └── types.ts             # Interview question and evaluation type definitions
└── tests/
    ├── curatedTests.ts      # Domain skill tests (GenAI, LLMs, Prompt Engineering, RAG, Math, Python)
    ├── generateTest.ts      # Gemini dynamic assessment generator for custom tech stacks
    ├── aiAnalysis.ts        # Performance analytics, percentile benchmarking & personalized study roadmaps
    ├── testStorage.ts       # Attempt state and assessment result persistence
    └── types.ts             # Test schema, question options, and score types
```

## Technologies
- **Google Gemini 2.5 Flash / Pro API** (`@google/genai`)
- **pdf2json & mammoth** document parsers
- **Prompt Engineering & Structured JSON Output Validation**
