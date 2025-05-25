export const SCORE_LEVELS = [
  { label: "Mild Traits", min: 0, max: 5 },
  { label: "Moderate Traits", min: 6, max: 8 },
  { label: "Strong Traits", min: 9, max: 11 },
  { label: "High Autism Traits", min: 12, max: 99 },
];

export function getResultLabel(score: number) {
  return SCORE_LEVELS.find((level) => score >= level.min && score <= level.max)?.label || "Unknown";
}