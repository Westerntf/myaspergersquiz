import { questions } from "../questions";

export type Trait = "social" | "sensory" | "routine" | "communication" | "focus";

type ScoreMap = Record<Trait, number>;

export function calculateScore(answers: (boolean | null)[]) {
  let total = 0;
  const traitScores: ScoreMap = {
    social: 0,
    sensory: 0,
    routine: 0,
    communication: 0,
    focus: 0,
  };

  answers.forEach((value, index) => {
    if (value) {
      const question = questions[index];
      const weight = question.weight || 1;
      const trait = question.trait;

      if (trait in traitScores) {
        total += weight;
        traitScores[trait as Trait] += weight;
      } else {
        console.warn(`Unrecognized trait "${trait}" at question ID ${question.id}`);
      }
    }
  });

  return { total, traitScores };
}