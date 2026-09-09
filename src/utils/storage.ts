import type { UserProfile, WeightEntry, DailyNutrition, FoodItem } from '../types';
import { SAMPLE_USER_PROFILE, generateSampleWeightEntries, generateSampleDailyNutrition } from '../data/sampleData';

const KEYS = {
  PROFILE: 'mygain_user_profile_v1',
  WEIGHT_ENTRIES: 'mygain_weight_entries_v1',
  DAILY_PREFIX: 'mygain_daily_nutrition_v1_',
  CUSTOM_FOODS: 'mygain_custom_foods_v1',
  APP_VERSION: 'mygain_version',
};

export const CURRENT_APP_VERSION = '1.0.0';

/**
 * Safely parse JSON from LocalStorage
 */
function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

/**
 * Safely write JSON to LocalStorage
 */
function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

// User Profile
export function getStoredProfile(): UserProfile | null {
  return safeGet<UserProfile | null>(KEYS.PROFILE, null);
}

export function saveStoredProfile(profile: UserProfile): void {
  safeSet(KEYS.PROFILE, profile);
}

// Weight Entries
export function getStoredWeightEntries(): WeightEntry[] {
  return safeGet<WeightEntry[]>(KEYS.WEIGHT_ENTRIES, []);
}

export function saveStoredWeightEntries(entries: WeightEntry[]): void {
  safeSet(KEYS.WEIGHT_ENTRIES, entries);
}

export function saveSingleWeightEntry(entry: WeightEntry): WeightEntry[] {
  const current = getStoredWeightEntries();
  const index = current.findIndex((e) => e.date === entry.date);
  let updated: WeightEntry[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = entry;
  } else {
    updated = [entry, ...current];
  }
  // Sort descending by date
  updated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  saveStoredWeightEntries(updated);
  return updated;
}

export function deleteStoredWeightEntry(id: string): WeightEntry[] {
  const current = getStoredWeightEntries();
  const updated = current.filter((e) => e.id !== id);
  saveStoredWeightEntries(updated);
  return updated;
}

// Daily Nutrition
export function getStoredDailyNutrition(dateStr: string): DailyNutrition {
  const fallback: DailyNutrition = {
    date: dateStr,
    meals: {
      breakfast: [],
      lunch: [],
      snacks: [],
      dinner: [],
    },
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  };

  const stored = safeGet<DailyNutrition>(`${KEYS.DAILY_PREFIX}${dateStr}`, fallback);

  // Recalculate totals to ensure absolute precision
  return recalculateDailyTotals(stored);
}

export function saveStoredDailyNutrition(nutrition: DailyNutrition): void {
  const recalculated = recalculateDailyTotals(nutrition);
  safeSet(`${KEYS.DAILY_PREFIX}${nutrition.date}`, recalculated);
}

export function recalculateDailyTotals(nutrition: DailyNutrition): DailyNutrition {
  const allEntries = [
    ...(nutrition.meals.breakfast || []),
    ...(nutrition.meals.lunch || []),
    ...(nutrition.meals.snacks || []),
    ...(nutrition.meals.dinner || []),
  ];

  const totalCalories = Math.round(allEntries.reduce((acc, curr) => acc + (curr.calories || 0), 0));
  const totalProtein = Number(allEntries.reduce((acc, curr) => acc + (curr.protein || 0), 0).toFixed(1));
  const totalCarbs = Number(allEntries.reduce((acc, curr) => acc + (curr.carbs || 0), 0).toFixed(1));
  const totalFat = Number(allEntries.reduce((acc, curr) => acc + (curr.fat || 0), 0).toFixed(1));

  return {
    ...nutrition,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
  };
}

// Custom Foods
export function getStoredCustomFoods(): FoodItem[] {
  return safeGet<FoodItem[]>(KEYS.CUSTOM_FOODS, []);
}

export function saveStoredCustomFood(food: FoodItem): FoodItem[] {
  const existing = getStoredCustomFoods();
  const updated = [food, ...existing.filter((f) => f.id !== food.id)];
  safeSet(KEYS.CUSTOM_FOODS, updated);
  return updated;
}

// Seed Demo Data for Instant Exploration
export function seedDemoData(): { profile: UserProfile; weights: WeightEntry[]; todayNutrition: DailyNutrition } {
  const todayStr = new Date().toISOString().split('T')[0];
  saveStoredProfile(SAMPLE_USER_PROFILE);

  const sampleWeights = generateSampleWeightEntries();
  saveStoredWeightEntries(sampleWeights);

  const sampleToday = generateSampleDailyNutrition(todayStr);
  saveStoredDailyNutrition(sampleToday);

  return {
    profile: SAMPLE_USER_PROFILE,
    weights: sampleWeights,
    todayNutrition: sampleToday,
  };
}

// Clear all data (Reset)
export function clearAllMYGAINData(): void {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('mygain_')) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.error('Error clearing data:', err);
  }
}

// Export / Import
export function exportAllDataJSON(): string {
  const data: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('mygain_')) {
      try {
        data[k] = JSON.parse(localStorage.getItem(k) || 'null');
      } catch {
        data[k] = localStorage.getItem(k);
      }
    }
  }
  return JSON.stringify(data, null, 2);
}

export function importAllDataJSON(jsonStr: string): boolean {
  try {
    const parsed = JSON.parse(jsonStr);
    Object.keys(parsed).forEach((key) => {
      if (key.startsWith('mygain_')) {
        localStorage.setItem(key, JSON.stringify(parsed[key]));
      }
    });
    return true;
  } catch (err) {
    console.error('Failed to import JSON data:', err);
    return false;
  }
}
