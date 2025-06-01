import { questions } from "../questions";

export type Trait = "social" | "sensory" | "routine" | "communication" | "focus";

type ScoreMap = Record<Trait, number>;

export function calculateScore(answers: number[]) {
  let rawTotal = 0;
  const traitRaw: ScoreMap = {
    social: 0,
    sensory: 0,
    routine: 0,
    communication: 0,
    focus: 0,
  };

  answers.forEach((weightValue, index) => {
    const question = questions[index];
    const trait = question.trait;
    if (trait in traitRaw) {
      rawTotal += weightValue;
      traitRaw[trait as Trait] += weightValue;
    } else {
      console.warn(`Unrecognized trait "${trait}" at question ID ${question.id}`);
    }
  });

  const total = Math.round(rawTotal);

  const traitScores: ScoreMap = {
    social: Math.round(traitRaw.social),
    sensory: Math.round(traitRaw.sensory),
    routine: Math.round(traitRaw.routine),
    communication: Math.round(traitRaw.communication),
    focus: Math.round(traitRaw.focus),
  };

  return { total, traitScores };
}