import type { UserProfile, NutritionTarget, ActivityLevel, Sex } from '../types';

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, { label: string; multiplier: number; description: string }> = {
  sedentary: {
    label: 'Sedentary',
    multiplier: 1.20,
    description: 'Desk job, little to no structured exercise',
  },
  light: {
    label: 'Lightly Active',
    multiplier: 1.375,
    description: 'Light exercise / sports 1-3 days per week',
  },
  moderate: {
    label: 'Moderately Active',
    multiplier: 1.55,
    description: 'Moderate exercise / weight training 3-5 days per week',
  },
  very_active: {
    label: 'Very Active',
    multiplier: 1.725,
    description: 'Hard training / sports 6-7 days per week',
  },
  extremely_active: {
    label: 'Extremely Active',
    multiplier: 1.90,
    description: 'Intense daily training, physical labour or 2x/day training',
  },
};

export const DEFAULT_SURPLUS_CALORIES = 250; // Clean, controlled weight-gain surplus
export const DEFAULT_PROTEIN_PER_KG = 1.6; // g/kg bodyweight
export const FAT_CALORIE_PERCENTAGE = 0.28; // 28% of total energy from dietary fats

/**
 * Calculate Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation
 */
export function calculateBMR(weightKg: number, heightCm: number, age: number, sex: Sex): number {
  if (weightKg <= 0 || heightCm <= 0 || age <= 0) return 0;
  
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = sex === 'male' ? base + 5 : base - 161;
  return Math.round(bmr);
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const config = ACTIVITY_MULTIPLIERS[activityLevel] || ACTIVITY_MULTIPLIERS.moderate;
  return Math.round(bmr * config.multiplier);
}

/**
 * Calculate complete personalized nutrition targets
 */
export function calculateNutritionTargets(
  profile: Pick<UserProfile, 'currentWeightKg' | 'heightCm' | 'age' | 'sex' | 'activityLevel' | 'proteinGramsPerKg' | 'customCalorieAdjustment'>
): NutritionTarget {
  const {
    currentWeightKg,
    heightCm,
    age,
    sex,
    activityLevel,
    proteinGramsPerKg = DEFAULT_PROTEIN_PER_KG,
    customCalorieAdjustment = 0,
  } = profile;

  const bmr = calculateBMR(currentWeightKg, heightCm, age, sex);
  const tdee = calculateTDEE(bmr, activityLevel);

  const surplusCalories = DEFAULT_SURPLUS_CALORIES + customCalorieAdjustment;
  const targetCalories = Math.max(1200, Math.round(tdee + surplusCalories));

  // Protein calculation (1.6 - 2.0g per kg of bodyweight)
  const proteinGrams = Math.round(currentWeightKg * proteinGramsPerKg);
  const proteinCalories = proteinGrams * 4;

  // Fat calculation (28% of total calories / 9 kcal per gram)
  const rawFatCalories = targetCalories * FAT_CALORIE_PERCENTAGE;
  const fatGrams = Math.round(rawFatCalories / 9);
  const fatCalories = fatGrams * 9;

  // Carbohydrates: remainder of energy after protein & fat
  const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);

  // Controlled weekly weight gain target: 0.25% to 0.50% of bodyweight/week
  const targetWeeklyGainKgMin = Number(((currentWeightKg * 0.0025)).toFixed(2));
  const targetWeeklyGainKgMax = Number(((currentWeightKg * 0.0050)).toFixed(2));

  return {
    bmr,
    tdee,
    targetCalories,
    surplusCalories,
    proteinGrams,
    fatGrams,
    carbGrams,
    proteinCalories,
    fatCalories,
    carbCalories,
    targetWeeklyGainKgMin,
    targetWeeklyGainKgMax,
    targetWeeklyGainPercentMin: 0.25,
    targetWeeklyGainPercentMax: 0.50,
  };
}

/**
 * Calculates theoretical weekly surplus weight potential (approx 7,700 kcal per kg)
 */
export function estimateWeeklySurplusGain(surplusDailyKcal: number): number {
  return Number(((surplusDailyKcal * 7) / 7700).toFixed(2));
}
