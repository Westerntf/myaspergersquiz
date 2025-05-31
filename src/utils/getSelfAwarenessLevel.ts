// src/utils/getSelfAwarenessLevel.ts

/**
 * Map total quiz score or some other metric into Self-Awareness levels (1–5).
 * You decide your breakpoints. For instance, if someone answers few “yes,” they are Level 1; if many “yes,” Level 5.
 */
export function getSelfAwarenessLevel(totalScore: number): number {
  if (totalScore <= 8) return 1;
  if (totalScore <= 16) return 2;
  if (totalScore <= 24) return 3;
  if (totalScore <= 32) return 4;
  return 5;
}