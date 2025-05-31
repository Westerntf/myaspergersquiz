// src/utils/getFlaggedLevel.ts
export function getFlaggedLevel(flagCount: number): number {
  if (flagCount === 0) return 1;
  if (flagCount === 1) return 2;
  if (flagCount <= 3) return 3;
  if (flagCount <= 5) return 4;
  return 5;
}