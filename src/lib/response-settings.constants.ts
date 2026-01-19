export interface ResponseLengthOption {
  id: "short" | "medium" | "auto";
  title: string;
  description: string;
  prompt: string;
}

export interface LanguageOption {
  id: string;
  name: string;
  flag: string;
  prompt: string;
}

export const RESPONSE_LENGTHS: ResponseLengthOption[] = [
  {
    id: "short",
    title: "Short",
    description:
      "Best for quick answers, summaries, and when you need to save time",
    prompt:
      "IMPORTANT: You must keep your response extremely brief and concise. Limit your answer to 2-4 sentences maximum. Provide only the most essential information. Do not include explanations, examples, or additional context unless explicitly requested. Get straight to the point. This is a strict requirement.",
  },
  {
    id: "medium",
    title: "Medium",
    description: "Balanced responses with adequate explanations for most tasks",
    prompt:
      "IMPORTANT: Provide responses with moderate length - not too brief, not too lengthy. Keep your answer to 1-2 paragraphs (approximately 4-8 sentences). Include key explanations and relevant details, but avoid being overly verbose or adding unnecessary elaboration. Stay focused and well-organized. This is a strict requirement.",
  },
  {
    id: "auto",
    title: "Auto",
    description:
      "AI determines the best length based on your question's complexity",
    prompt:
      "IMPORTANT: Carefully assess the complexity and scope of the question, then adjust your response length accordingly. For simple questions, be brief (2-4 sentences). For moderate questions, provide balanced detail (1-2 paragraphs). For complex questions, give comprehensive answers with appropriate depth. Always match the response length to what the question actually requires - no more, no less.",
  },
];

export const LANGUAGES: LanguageOption[] = [
  {
    id: "english",
    name: "English",
    flag: "🇺🇸",
    prompt: "Respond in English.",
  },
  {
    id: "russian",
    name: "Russian",
    flag: "🇷🇺",
    prompt: "Respond in Russian (Русский).",
  },
];

export const DEFAULT_RESPONSE_LENGTH = "auto";
export const DEFAULT_LANGUAGE = 'russian'
export const DEFAULT_AUTO_SCROLL = true;
