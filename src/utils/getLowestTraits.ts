import { Trait } from "./calculateScore";

export function getLowestTraits(traitScores: Record<Trait, number>, count: number): Trait[] {
  const allHigh = Object.values(traitScores).every(score => score >= 7);
  if (allHigh) {
    return ["global" as Trait];
  }

  return Object.entries(traitScores)
    .sort(([, a], [, b]) => a - b)
    .slice(0, count)
    .map(([trait]) => trait as Trait);
}