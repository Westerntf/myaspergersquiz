// src/utils/storage.ts

const QUIZ_RUN_ID_KEY = "quizRunId";
const QUIZ_ANSWERS_KEY = "quizAnswers";

export const getQuizRunId = () => localStorage.getItem(QUIZ_RUN_ID_KEY);
export const setQuizRunId = (id: string) => localStorage.setItem(QUIZ_RUN_ID_KEY, id);
export const clearQuizRunId = () => localStorage.removeItem(QUIZ_RUN_ID_KEY);

export const getQuizAnswers = (): number[] => {
  const raw = localStorage.getItem(QUIZ_ANSWERS_KEY);
  return raw ? (JSON.parse(raw) as number[]) : [];
};
export const setQuizAnswers = (answers: number[]) =>
  localStorage.setItem(QUIZ_ANSWERS_KEY, JSON.stringify(answers));
export const clearQuizAnswers = () => localStorage.removeItem(QUIZ_ANSWERS_KEY);