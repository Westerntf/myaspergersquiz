import { scoreLevels } from "./scoreLevels";
import { Trait } from "./calculateScore";

export function getTraitLevel(trait: Trait, score: number) {
  const levels = scoreLevels[trait];
  const matched = levels.find((level) => score >= level.min && score <= level.max);
  return {
    ...matched!,
    level: levels.indexOf(matched!) + 1, // e.g., 1 to 8
  };
}