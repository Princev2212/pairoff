import type { UserProfile, WeightEntry, DailyNutrition } from '../types';

export const SAMPLE_USER_PROFILE: UserProfile = {
  name: 'Alex Sharma',
  age: 24,
  sex: 'male',
  heightCm: 175,
  currentWeightKg: 59.4,
  targetWeightKg: 66.0,
  activityLevel: 'moderate',
  workoutDaysPerWeek: 4,
  goalType: 'lean_bulk',
  proteinGramsPerKg: 1.6,
  customCalorieAdjustment: 0,
  isOnboarded: true,
  createdAt: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Generates 14 days of realistic weight progression with natural daily fluctuations
 * starting from ~58.2 kg up to 59.4 kg (steady lean gain of ~0.3kg/week).
 */
export function generateSampleWeightEntries(): WeightEntry[] {
  const entries: WeightEntry[] = [];
  const baseWeight = 58.2;
  const days = 14;

  const fluctuations = [
    0.0, 0.1, -0.05, 0.15, 0.1, 0.2, 0.25, // Week 1 (~58.45 kg)
    0.35, 0.4, 0.45, 0.6, 0.75, 0.9, 1.2,  // Week 2 (~59.4 kg)
  ];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 3600 * 1000).toISOString().split('T')[0];
    const weight = Number((baseWeight + fluctuations[days - 1 - i]).toFixed(1));
    entries.push({
      id: `weight_sample_${date}`,
      date,
      weightKg: weight,
      isFasted: true,
      timeOfDay: 'morning',
      notes: i === 0 ? 'Fasted weigh-in after morning glass of water' : undefined,
      createdAt: new Date(Date.now() - i * 24 * 3600 * 1000).toISOString(),
    });
  }

  return entries;
}

/**
 * Generates sample meals for today showcasing high-protein, calorie-surplus Indian foods
 */
export function generateSampleDailyNutrition(dateStr: string): DailyNutrition {
  return {
    date: dateStr,
    meals: {
      breakfast: [
        {
          id: 'm_bf_1',
          mealType: 'breakfast',
          foodName: 'Rolled Oats in Whole Milk',
          quantityGrams: 280,
          servingLabel: '1 bowl with 250ml milk',
          calories: 375,
          protein: 15.0,
          carbs: 45.0,
          fat: 15.0,
          loggedAt: `${dateStr}T08:30:00.000Z`,
        },
        {
          id: 'm_bf_2',
          mealType: 'breakfast',
          foodName: 'Boiled Eggs (2 pcs)',
          quantityGrams: 100,
          servingLabel: '2 whole eggs',
          calories: 155,
          protein: 12.6,
          carbs: 1.1,
          fat: 10.6,
          loggedAt: `${dateStr}T08:35:00.000Z`,
        },
        {
          id: 'm_bf_3',
          mealType: 'breakfast',
          foodName: 'Banana (Ripe)',
          quantityGrams: 120,
          servingLabel: '1 medium',
          calories: 105,
          protein: 1.3,
          carbs: 27.0,
          fat: 0.3,
          loggedAt: `${dateStr}T08:35:00.000Z`,
        },
      ],
      lunch: [
        {
          id: 'm_lu_1',
          mealType: 'lunch',
          foodName: 'White Rice (Cooked)',
          quantityGrams: 200,
          servingLabel: '1.3 bowl (200g)',
          calories: 260,
          protein: 5.4,
          carbs: 57.0,
          fat: 0.6,
          loggedAt: `${dateStr}T13:15:00.000Z`,
        },
        {
          id: 'm_lu_2',
          mealType: 'lunch',
          foodName: 'Yellow Dal Tadka',
          quantityGrams: 150,
          servingLabel: '1 bowl (150g)',
          calories: 160,
          protein: 8.5,
          carbs: 21.0,
          fat: 4.5,
          loggedAt: `${dateStr}T13:15:00.000Z`,
        },
        {
          id: 'm_lu_3',
          mealType: 'lunch',
          foodName: 'Paneer (Cottage Cheese)',
          quantityGrams: 100,
          servingLabel: '100g fresh paneer',
          calories: 265,
          protein: 18.3,
          carbs: 3.2,
          fat: 20.8,
          loggedAt: `${dateStr}T13:20:00.000Z`,
        },
        {
          id: 'm_lu_4',
          mealType: 'lunch',
          foodName: 'Chapati / Roti with Ghee',
          quantityGrams: 45,
          servingLabel: '1 roti with ghee',
          calories: 145,
          protein: 3.2,
          carbs: 21.0,
          fat: 5.2,
          loggedAt: `${dateStr}T13:20:00.000Z`,
        },
      ],
      snacks: [
        {
          id: 'm_sn_1',
          mealType: 'snacks',
          foodName: 'Roasted Peanuts',
          quantityGrams: 40,
          servingLabel: '1 handful (40g)',
          calories: 235,
          protein: 10.4,
          carbs: 6.5,
          fat: 19.8,
          loggedAt: `${dateStr}T17:00:00.000Z`,
        },
        {
          id: 'm_sn_2',
          mealType: 'snacks',
          foodName: 'Whole Milk (Full Cream)',
          quantityGrams: 250,
          servingLabel: '1 glass (250ml)',
          calories: 185,
          protein: 8.5,
          carbs: 12.0,
          fat: 11.5,
          loggedAt: `${dateStr}T17:00:00.000Z`,
        },
      ],
      dinner: [
        {
          id: 'm_dn_1',
          mealType: 'dinner',
          foodName: 'Chicken Breast (Grilled)',
          quantityGrams: 150,
          servingLabel: '1 fillet (150g)',
          calories: 245,
          protein: 46.0,
          carbs: 0.0,
          fat: 5.5,
          loggedAt: `${dateStr}T20:30:00.000Z`,
        },
        {
          id: 'm_dn_2',
          mealType: 'dinner',
          foodName: 'White Rice (Cooked)',
          quantityGrams: 150,
          servingLabel: '1 bowl (150g)',
          calories: 195,
          protein: 4.1,
          carbs: 43.0,
          fat: 0.5,
          loggedAt: `${dateStr}T20:30:00.000Z`,
        },
        {
          id: 'm_dn_3',
          mealType: 'dinner',
          foodName: 'Curd / Dahi (Plain)',
          quantityGrams: 150,
          servingLabel: '1 katori (150g)',
          calories: 110,
          protein: 5.5,
          carbs: 6.8,
          fat: 6.5,
          loggedAt: `${dateStr}T20:30:00.000Z`,
        },
      ],
    },
    totalCalories: 2430,
    totalProtein: 138.8,
    totalCarbs: 262.6,
    totalFat: 95.5,
  };
}
