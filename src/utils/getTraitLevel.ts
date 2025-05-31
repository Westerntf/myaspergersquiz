import { scoreLevels } from "./scoreLevels";
import { Trait } from "./calculateScore";

/**
 * Maps a trait name and its numeric score (0–8) to an object containing
 * min, max, description, etc. and a level index (1–8).
 */
export function getTraitLevel(trait: Trait, score: number) {
  const levels = scoreLevels[trait];
  const matched = levels.find((level) => score >= level.min && score <= level.max);
  return {
    ...matched!,
    level: levels.indexOf(matched!) + 1, // e.g., 1 to 8
  };
}

/**
 * Individual helper functions for each trait so you can import 
 * them directly (and receive just the numeric level).
 */
export function getCommunicationLevel(score: number): number {
  return getTraitLevel("communication", score).level;
}

export function getSocialLevel(score: number): number {
  return getTraitLevel("social", score).level;
}

export function getSensoryLevel(score: number): number {
  return getTraitLevel("sensory", score).level;
}

export function getRoutineLevel(score: number): number {
  return getTraitLevel("routine", score).level;
}

export function getFocusLevel(score: number): number {
  return getTraitLevel("focus", score).level;
}