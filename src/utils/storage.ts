// src/utils/storage.ts

export function saveToStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
}