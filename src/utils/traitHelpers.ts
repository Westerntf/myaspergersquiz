export function getTraitLevel(p0: string, score: number): { level: number } {
  if (score <= 1) return { level: 1 };
  if (score <= 2) return { level: 2 };
  if (score <= 3) return { level: 3 };
  if (score <= 4) return { level: 4 };
  if (score <= 5) return { level: 5 };
  if (score <= 6) return { level: 6 };
  if (score <= 7) return { level: 7 };
  return { level: 8 };
}

export function getTopTraits(traitScores: Record<string, number>, count = 3): string[] {
  return Object.entries(traitScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([trait]) => trait);
}

export function getLowestTrait(traitScores: Record<string, number>): string {
  return Object.entries(traitScores).reduce((minTrait, [trait, score]) => {
    return score < traitScores[minTrait] ? trait : minTrait;
  }, Object.keys(traitScores)[0]);
}

export function getOverallLevel(traitScores: Record<string, number>): number {
  const total = Object.values(traitScores).reduce((sum, score) => sum + score, 0);
  return getTraitLevel("overall", total).level;
}