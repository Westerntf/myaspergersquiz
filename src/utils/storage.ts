// src/lib/storage.ts

const QUIZ_SESSION_KEY = "mq_session_id";
const QUIZ_ANSWERS_KEY = "mq_answers";
const QUIZ_RUN_ID_KEY = "mq_run_id";

export const getQuizSessionId = () => localStorage.getItem(QUIZ_SESSION_KEY);
export const setQuizSessionId = (id: string) => localStorage.setItem(QUIZ_SESSION_KEY, id);
export const clearQuizSessionId = () => localStorage.removeItem(QUIZ_SESSION_KEY);

export const getQuizAnswers = (): number[] => {
  const raw = localStorage.getItem(QUIZ_ANSWERS_KEY);
  return raw ? (JSON.parse(raw) as number[]) : [];
};
export const setQuizAnswers = (answers: number[]) => {
  localStorage.setItem(QUIZ_ANSWERS_KEY, JSON.stringify(answers));
};
export const clearQuizAnswers = () => localStorage.removeItem(QUIZ_ANSWERS_KEY);

export const getQuizRunId = () => localStorage.getItem(QUIZ_RUN_ID_KEY);
export const setQuizRunId = (id: string) => localStorage.setItem(QUIZ_RUN_ID_KEY, id);
export const clearQuizRunId = () => localStorage.removeItem(QUIZ_RUN_ID_KEY);

export const clearAllQuizData = () => {
  clearQuizSessionId();
  clearQuizAnswers();
  clearQuizRunId();
};

export function loadFromStorage<T = any>(key: string): T | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(key);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error("Failed to parse localStorage item", err);
    return null;
  }
}

export function saveToStorage<T = any>(key: string, value: T): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}