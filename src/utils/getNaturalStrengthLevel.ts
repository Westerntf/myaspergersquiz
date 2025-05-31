

/**
 * Maps the lowest trait score (minTraitScore) to a Natural Strengths level (1–5).
 * Levels:
 *   - Level 1: minTraitScore >= 8
 *   - Level 2: minTraitScore >= 6
 *   - Level 3: minTraitScore >= 4
 *   - Level 4: minTraitScore >= 2
 *   - Level 5: minTraitScore < 2
 *
 * @param minTraitScore - The lowest score across a user’s trait scores (0–8).
 * @returns A numeric level (1–5) representing the user’s Natural Strength category.
 */
export function getNaturalStrengthLevel(minTraitScore: number): number {
  if (minTraitScore >= 8) return 1;
  if (minTraitScore >= 6) return 2;
  if (minTraitScore >= 4) return 3;
  if (minTraitScore >= 2) return 4;
  return 5;
}