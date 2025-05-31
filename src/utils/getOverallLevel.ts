// src/utils/getOverallLevel.ts

/**
 * Maps a total quiz score (0–40) to a How-You-Fit-In level (1–8).
 * Adjust the numeric boundaries below to suit your desired buckets.
 */
export function getOverallLevel(totalScore: number): number {
  if (totalScore <= 4) return 1;
  if (totalScore <= 9) return 2;
  if (totalScore <= 14) return 3;
  if (totalScore <= 19) return 4;
  if (totalScore <= 24) return 5;
  if (totalScore <= 29) return 6;
  if (totalScore <= 34) return 7;
  return 8;
}