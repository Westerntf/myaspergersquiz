import { Trait } from "./calculateScore";
import { scoreLevels } from "./scoreLevels";

type TraitScores = Record<Trait, number>;
type TraitLabels = Record<Trait, string>;

export function getResultLabel(traitScores: TraitScores): TraitLabels {
  const labels: Partial<TraitLabels> = {};

  for (const trait in traitScores) {
    const score = traitScores[trait as Trait];
    const levels = scoreLevels[trait as Trait];

    const matched = levels.find(level => score >= level.min && score <= level.max);
    labels[trait as Trait] = matched ? matched.label : "Unknown";
  }

  return labels as TraitLabels;
}