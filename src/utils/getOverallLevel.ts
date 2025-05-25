export function getOverallLevel(totalScore: number): number {
  if (totalScore <= 5) return 1;
  if (totalScore <= 8) return 2;
  if (totalScore <= 11) return 3;
  if (totalScore <= 14) return 4;
  if (totalScore <= 17) return 5;
  if (totalScore <= 20) return 6;
  if (totalScore <= 23) return 7;
  return 8;
}