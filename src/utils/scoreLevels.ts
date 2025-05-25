import { Trait } from "./calculateScore";

type Level = {
  label: string;
  min: number;
  max: number;
};

type LevelMap = Record<Trait, Level[]>;

export const scoreLevels: LevelMap = {
  social: [
    { label: "Level 1 – Very Low", min: 0, max: 1 },
    { label: "Level 2 – Low", min: 2, max: 2 },
    { label: "Level 3 – Mild", min: 3, max: 3 },
    { label: "Level 4 – Moderate", min: 4, max: 4 },
    { label: "Level 5 – Elevated", min: 5, max: 5 },
    { label: "Level 6 – High", min: 6, max: 6 },
    { label: "Level 7 – Very High", min: 7, max: 7 },
    { label: "Level 8 – Extreme", min: 8, max: Infinity }
  ],
  sensory: [
    { label: "Level 1 – Very Low", min: 0, max: 1 },
    { label: "Level 2 – Low", min: 2, max: 2 },
    { label: "Level 3 – Mild", min: 3, max: 3 },
    { label: "Level 4 – Moderate", min: 4, max: 4 },
    { label: "Level 5 – Elevated", min: 5, max: 5 },
    { label: "Level 6 – High", min: 6, max: 6 },
    { label: "Level 7 – Very High", min: 7, max: 7 },
    { label: "Level 8 – Extreme", min: 8, max: Infinity }
  ],
  routine: [
    { label: "Level 1 – Very Low", min: 0, max: 1 },
    { label: "Level 2 – Low", min: 2, max: 2 },
    { label: "Level 3 – Mild", min: 3, max: 3 },
    { label: "Level 4 – Moderate", min: 4, max: 4 },
    { label: "Level 5 – Elevated", min: 5, max: 5 },
    { label: "Level 6 – High", min: 6, max: 6 },
    { label: "Level 7 – Very High", min: 7, max: 7 },
    { label: "Level 8 – Extreme", min: 8, max: Infinity }
  ],
  communication: [
    { label: "Level 1 – Very Low", min: 0, max: 1 },
    { label: "Level 2 – Low", min: 2, max: 2 },
    { label: "Level 3 – Mild", min: 3, max: 3 },
    { label: "Level 4 – Moderate", min: 4, max: 4 },
    { label: "Level 5 – Elevated", min: 5, max: 5 },
    { label: "Level 6 – High", min: 6, max: 6 },
    { label: "Level 7 – Very High", min: 7, max: 7 },
    { label: "Level 8 – Extreme", min: 8, max: Infinity }
  ],
  focus: [
    { label: "Level 1 – Very Low", min: 0, max: 1 },
    { label: "Level 2 – Low", min: 2, max: 2 },
    { label: "Level 3 – Mild", min: 3, max: 3 },
    { label: "Level 4 – Moderate", min: 4, max: 4 },
    { label: "Level 5 – Elevated", min: 5, max: 5 },
    { label: "Level 6 – High", min: 6, max: 6 },
    { label: "Level 7 – Very High", min: 7, max: 7 },
    { label: "Level 8 – Extreme", min: 8, max: Infinity }
  ]
};