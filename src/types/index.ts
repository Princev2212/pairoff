export type Sex = 'male' | 'female';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extremely_active';

export type WeightGoalType = 'lean_bulk' | 'general_gain';

export type MealType = 'breakfast' | 'lunch' | 'snacks' | 'dinner';

export interface UserProfile {
  name: string;
  age: number;
  sex: Sex;
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  activityLevel: ActivityLevel;
  workoutDaysPerWeek: number;
  goalType: WeightGoalType;
  proteinGramsPerKg: number; // default 1.6
  customCalorieAdjustment?: number; // optional manual override
  isOnboarded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionTarget {
  bmr: number;
  tdee: number;
  targetCalories: number;
  surplusCalories: number;
  proteinGrams: number;
  fatGrams: number;
  carbGrams: number;
  proteinCalories: number;
  fatCalories: number;
  carbCalories: number;
  targetWeeklyGainKgMin: number;
  targetWeeklyGainKgMax: number;
  targetWeeklyGainPercentMin: number; // e.g. 0.25%
  targetWeeklyGainPercentMax: number; // e.g. 0.50%
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'grains' | 'protein' | 'dairy' | 'vegetables' | 'fruits' | 'nuts_fats' | 'meals' | 'snacks' | 'shakes' | 'other';
  servingSizeGrams: number;
  servingUnit: string; // e.g. "1 bowl (150g)", "1 piece (40g)", "100g"
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  isIndian?: boolean;
  notes?: string;
}

export interface FoodEntry {
  id: string;
  mealType: MealType;
  foodName: string;
  quantityGrams: number;
  servingLabel: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isEstimated?: boolean;
  confidenceScore?: number;
  loggedAt: string; // ISO string
  imageUrl?: string;
}

export interface Meal {
  type: MealType;
  entries: FoodEntry[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface DailyNutrition {
  date: string; // YYYY-MM-DD
  meals: Record<MealType, FoodEntry[]>;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  waterIntakeMl?: number;
}

export interface WeightEntry {
  id: string;
  date: string; // YYYY-MM-DD
  weightKg: number;
  notes?: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
  isFasted?: boolean;
  createdAt: string;
}

export interface WeightTrendPoint {
  date: string;
  weightKg: number;
  movingAverage7Day?: number;
  targetWeightKg: number;
  formattedDate: string;
}

export type TrendStatus = 'below_target' | 'on_track' | 'above_target' | 'insufficient_data';

export interface WeightTrendEvaluation {
  currentWeightKg: number;
  startingWeightKg: number;
  targetWeightKg: number;
  totalGainedKg: number;
  remainingKg: number;
  progressPercentage: number;
  current7DayAverageKg: number | null;
  previous7DayAverageKg: number | null;
  weeklyChangeKg: number | null;
  weeklyChangePercent: number | null;
  status: TrendStatus;
  statusHeadline: string;
  recommendation: string;
  suggestedCalorieAdjustment: number; // e.g. +150, 0, -100
  confidence: 'high' | 'medium' | 'low';
}

export interface CoachInsight {
  id: string;
  type: 'calorie_surplus' | 'protein_pacing' | 'weight_trend' | 'meal_timing' | 'density_tip';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  metric?: string;
  actionLabel?: string;
  actionRoute?: string;
}

export interface DetectedFoodItem {
  id: string;
  name: string;
  quantityGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number; // 0-1
  bbox?: { x: number; y: number; width: number; height: number }; // relative 0-100%
  category: string;
}

export interface FoodAnalysisResult {
  imageUrl: string;
  items: DetectedFoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  mealTypeSuggestion: MealType;
  overallConfidence: number; // 0-1
  uncertaintyNotes: string[];
  analyzedAt: string;
}
