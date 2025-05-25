import { Trait } from "./calculateScore";

export function getTopTraits(traitScores: Record<Trait, number>, count: number): Trait[] {
  return Object.entries(traitScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([trait]) => trait as Trait);
}