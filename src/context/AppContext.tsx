import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type {
  UserProfile,
  NutritionTarget,
  WeightEntry,
  DailyNutrition,
  FoodEntry,
  MealType,
  WeightTrendEvaluation,
  CoachInsight,
} from '../types';
import { calculateNutritionTargets } from '../services/nutritionCalculator';
import { evaluateWeightTrend } from '../services/adaptiveEngine';
import {
  getStoredProfile,
  saveStoredProfile,
  getStoredWeightEntries,
  saveSingleWeightEntry,
  deleteStoredWeightEntry,
  getStoredDailyNutrition,
  saveStoredDailyNutrition,
  seedDemoData,
  clearAllMYGAINData,
} from '../utils/storage';

interface AppContextType {
  profile: UserProfile | null;
  targets: NutritionTarget | null;
  weightEntries: WeightEntry[];
  activeDate: string;
  dailyNutrition: DailyNutrition;
  weightTrend: WeightTrendEvaluation;
  coachInsights: CoachInsight[];
  
  // UI Modal Controls
  isScannerOpen: boolean;
  isAddFoodOpen: boolean;
  isLogWeightOpen: boolean;
  activeMealSlot: MealType;
  
  // Handlers
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setActiveDate: (date: string) => void;
  addFoodEntry: (mealType: MealType, entry: Omit<FoodEntry, 'id' | 'loggedAt' | 'mealType'>) => void;
  addMultipleFoodEntries: (mealType: MealType, entries: Omit<FoodEntry, 'id' | 'loggedAt' | 'mealType'>[]) => void;
  updateFoodEntry: (mealType: MealType, entryId: string, updates: Partial<FoodEntry>) => void;
  deleteFoodEntry: (mealType: MealType, entryId: string) => void;
  clearMeal: (mealType: MealType) => void;
  
  logWeight: (
    weightKg: number,
    notes?: string,
    isFasted?: boolean,
    timeOfDay?: 'morning' | 'afternoon' | 'evening',
    customDate?: string
  ) => void;
  deleteWeight: (id: string) => void;
  applySuggestedCalorieAdjustment: (adjustmentKcal: number) => void;
  
  loadDemoData: () => void;
  resetAllData: () => void;
  
  openScanner: (mealType?: MealType) => void;
  closeScanner: () => void;
  openAddFood: (mealType?: MealType) => void;
  closeAddFood: () => void;
  openLogWeight: () => void;
  closeLogWeight: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  
  const [profile, setProfileState] = useState<UserProfile | null>(() => getStoredProfile());
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>(() => getStoredWeightEntries());
  const [activeDate, setActiveDate] = useState<string>(todayStr);
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition>(() => getStoredDailyNutrition(todayStr));
  
  // Modal states
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [isLogWeightOpen, setIsLogWeightOpen] = useState(false);
  const [activeMealSlot, setActiveMealSlot] = useState<MealType>('lunch');

  // Sync daily nutrition when active date changes
  useEffect(() => {
    setDailyNutrition(getStoredDailyNutrition(activeDate));
  }, [activeDate]);

  // Derived nutrition targets from profile
  const targets = useMemo<NutritionTarget | null>(() => {
    if (!profile) return null;
    return calculateNutritionTargets({
      currentWeightKg: profile.currentWeightKg,
      heightCm: profile.heightCm,
      age: profile.age,
      sex: profile.sex,
      activityLevel: profile.activityLevel,
      proteinGramsPerKg: profile.proteinGramsPerKg || 1.6,
      customCalorieAdjustment: profile.customCalorieAdjustment || 0,
    });
  }, [profile]);

  // Derived 7-day rolling weight trend evaluation
  const weightTrend = useMemo<WeightTrendEvaluation>(() => {
    const curWeight = profile?.currentWeightKg || 60;
    const tgtWeight = profile?.targetWeightKg || 65;
    return evaluateWeightTrend(weightEntries, curWeight, tgtWeight);
  }, [weightEntries, profile]);

  // Generate dynamic AI Coach insights based on daily metrics & weight trend
  const coachInsights = useMemo<CoachInsight[]>(() => {
    if (!targets) return [];
    
    const insights: CoachInsight[] = [];
    const remainingCalories = targets.targetCalories - dailyNutrition.totalCalories;
    const remainingProtein = targets.proteinGrams - dailyNutrition.totalProtein;
    
    // 1. Calorie Balance Insight
    if (remainingCalories > 600) {
      insights.push({
        id: 'ci_calorie_gap',
        type: 'calorie_surplus',
        priority: 'high',
        title: 'Calorie Surplus Gap',
        message: `You have approximately ${Math.round(remainingCalories)} kcal remaining to secure today's +${targets.surplusCalories} kcal surplus. Consider adding a nutrient-dense shake (whole milk + oats + peanut butter) or an extra handful of nuts.`,
        metric: `${Math.round(remainingCalories)} kcal remaining`,
        actionLabel: 'Log High-Density Food',
        actionRoute: '/nutrition',
      });
    } else if (remainingCalories <= 200 && remainingCalories >= -150) {
      insights.push({
        id: 'ci_calorie_target_hit',
        type: 'calorie_surplus',
        priority: 'medium',
        title: 'Optimal Surplus Reached',
        message: `Today's caloric intake is right on target for clean muscle synthesis. Great consistency!`,
        metric: `${dailyNutrition.totalCalories} / ${targets.targetCalories} kcal`,
      });
    } else if (remainingCalories < -300) {
      insights.push({
        id: 'ci_calorie_excess',
        type: 'calorie_surplus',
        priority: 'low',
        title: 'Surplus Higher Than Planned',
        message: `You are ${Math.abs(Math.round(remainingCalories))} kcal over your controlled surplus. For clean lean gains, balance your intake tomorrow.`,
        metric: `${dailyNutrition.totalCalories} kcal consumed`,
      });
    }

    // 2. Protein Pacing Insight
    if (remainingProtein > 30) {
      insights.push({
        id: 'ci_protein_gap',
        type: 'protein_pacing',
        priority: 'high',
        title: 'Protein Target Gap',
        message: `You are ${Math.round(remainingProtein)} g short of your target (${targets.proteinGrams} g). Prioritize protein sources like 100g paneer, 3 boiled eggs, or grilled chicken breast for your remaining meal.`,
        metric: `${Math.round(remainingProtein)} g needed`,
        actionLabel: 'Scan High-Protein Meal',
        actionRoute: '/scan',
      });
    } else if (remainingProtein <= 0) {
      insights.push({
        id: 'ci_protein_met',
        type: 'protein_pacing',
        priority: 'medium',
        title: 'Protein Synthesis Target Met',
        message: `Target achieved (${Math.round(dailyNutrition.totalProtein)} g / ${targets.proteinGrams} g). You have supplied optimal amino acids for recovery.`,
        metric: `${Math.round(dailyNutrition.totalProtein)} g protein`,
      });
    }

    // 3. Weight Trend & Progression Insight
    if (weightTrend.status === 'below_target') {
      insights.push({
        id: 'ci_trend_slow',
        type: 'weight_trend',
        priority: 'high',
        title: 'Weight Gain Rate Below Range',
        message: weightTrend.recommendation,
        metric: weightTrend.weeklyChangeKg !== null ? `${weightTrend.weeklyChangeKg > 0 ? '+' : ''}${weightTrend.weeklyChangeKg} kg/wk` : 'Calibrating',
        actionLabel: 'Apply +150 kcal Adjustment',
      });
    } else if (weightTrend.status === 'on_track') {
      insights.push({
        id: 'ci_trend_on_track',
        type: 'weight_trend',
        priority: 'medium',
        title: 'Growth Velocity On Track',
        message: `Your rolling 7-day average is climbing steadily at ${weightTrend.weeklyChangeKg !== null ? `+${weightTrend.weeklyChangeKg} kg/wk` : 'a steady rate'}. This promotes high muscle-to-fat ratio.`,
        metric: 'On Track',
      });
    } else if (weightTrend.status === 'above_target') {
      insights.push({
        id: 'ci_trend_fast',
        type: 'weight_trend',
        priority: 'medium',
        title: 'Gaining Faster Than Target',
        message: weightTrend.recommendation,
        metric: `${weightTrend.weeklyChangeKg !== null ? `+${weightTrend.weeklyChangeKg} kg/wk` : 'Fast'}`,
        actionLabel: 'Adjust Target',
      });
    }

    // 4. Practical Weight-Gain Density Tip
    insights.push({
      id: 'ci_density_tip',
      type: 'density_tip',
      priority: 'low',
      title: 'Mass Nutrition Pro-Tip',
      message: 'Liquid calories don’t trigger intense fullness receptors like dry food. Blending 250ml whole milk with 40g oats and 2 tbsp peanut butter delivers an effortless 580 kcal without digestive heaviness.',
      metric: 'Digestion Tip',
    });

    return insights;
  }, [targets, dailyNutrition, weightTrend]);

  // Profile Management
  const setProfile = useCallback((newProfile: UserProfile) => {
    setProfileState(newProfile);
    saveStoredProfile(newProfile);
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfileState((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      saveStoredProfile(updated);
      return updated;
    });
  }, []);

  // Food Logging
  const addFoodEntry = useCallback(
    (mealType: MealType, entryData: Omit<FoodEntry, 'id' | 'loggedAt' | 'mealType'>) => {
      const newEntry: FoodEntry = {
        ...entryData,
        id: `food_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        mealType,
        loggedAt: new Date().toISOString(),
      };

      setDailyNutrition((prev) => {
        const currentMeals = prev.meals || { breakfast: [], lunch: [], snacks: [], dinner: [] };
        const updatedMealEntries = [...(currentMeals[mealType] || []), newEntry];
        const updatedDaily: DailyNutrition = {
          ...prev,
          meals: {
            ...currentMeals,
            [mealType]: updatedMealEntries,
          },
        };
        saveStoredDailyNutrition(updatedDaily);
        return getStoredDailyNutrition(prev.date);
      });
    },
    []
  );

  const addMultipleFoodEntries = useCallback(
    (mealType: MealType, entriesData: Omit<FoodEntry, 'id' | 'loggedAt' | 'mealType'>[]) => {
      const newEntries: FoodEntry[] = entriesData.map((data, index) => ({
        ...data,
        id: `food_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 4)}`,
        mealType,
        loggedAt: new Date().toISOString(),
      }));

      setDailyNutrition((prev) => {
        const currentMeals = prev.meals || { breakfast: [], lunch: [], snacks: [], dinner: [] };
        const updatedMealEntries = [...(currentMeals[mealType] || []), ...newEntries];
        const updatedDaily: DailyNutrition = {
          ...prev,
          meals: {
            ...currentMeals,
            [mealType]: updatedMealEntries,
          },
        };
        saveStoredDailyNutrition(updatedDaily);
        return getStoredDailyNutrition(prev.date);
      });
    },
    []
  );

  const updateFoodEntry = useCallback(
    (mealType: MealType, entryId: string, updates: Partial<FoodEntry>) => {
      setDailyNutrition((prev) => {
        const currentList = prev.meals[mealType] || [];
        const updatedList = currentList.map((item) =>
          item.id === entryId ? { ...item, ...updates } : item
        );
        const updatedDaily: DailyNutrition = {
          ...prev,
          meals: {
            ...prev.meals,
            [mealType]: updatedList,
          },
        };
        saveStoredDailyNutrition(updatedDaily);
        return getStoredDailyNutrition(prev.date);
      });
    },
    []
  );

  const deleteFoodEntry = useCallback(
    (mealType: MealType, entryId: string) => {
      setDailyNutrition((prev) => {
        const currentList = prev.meals[mealType] || [];
        const updatedList = currentList.filter((item) => item.id !== entryId);
        const updatedDaily: DailyNutrition = {
          ...prev,
          meals: {
            ...prev.meals,
            [mealType]: updatedList,
          },
        };
        saveStoredDailyNutrition(updatedDaily);
        return getStoredDailyNutrition(prev.date);
      });
    },
    []
  );

  const clearMeal = useCallback(
    (mealType: MealType) => {
      setDailyNutrition((prev) => {
        const updatedDaily: DailyNutrition = {
          ...prev,
          meals: {
            ...prev.meals,
            [mealType]: [],
          },
        };
        saveStoredDailyNutrition(updatedDaily);
        return getStoredDailyNutrition(prev.date);
      });
    },
    []
  );

  // Weight Logging
  const logWeight = useCallback(
    (
      weightKg: number,
      notes?: string,
      isFasted: boolean = true,
      timeOfDay: 'morning' | 'afternoon' | 'evening' = 'morning',
      customDate?: string
    ) => {
      const entryDate = customDate || todayStr;
      const newEntry: WeightEntry = {
        id: `weight_${entryDate}_${Date.now()}`,
        date: entryDate,
        weightKg,
        notes,
        isFasted,
        timeOfDay,
        createdAt: new Date().toISOString(),
      };

      const updatedEntries = saveSingleWeightEntry(newEntry);
      setWeightEntries(updatedEntries);

      // If logging for today, update current weight in profile too
      if (entryDate === todayStr && profile) {
        updateProfile({ currentWeightKg: weightKg });
      }
    },
    [todayStr, profile, updateProfile]
  );

  const deleteWeight = useCallback((id: string) => {
    const updated = deleteStoredWeightEntry(id);
    setWeightEntries(updated);
  }, []);

  const applySuggestedCalorieAdjustment = useCallback(
    (adjustmentKcal: number) => {
      if (!profile) return;
      const currentAdjustment = profile.customCalorieAdjustment || 0;
      updateProfile({ customCalorieAdjustment: currentAdjustment + adjustmentKcal });
    },
    [profile, updateProfile]
  );

  // Demo Data & Reset
  const loadDemoData = useCallback(() => {
    const data = seedDemoData();
    setProfileState(data.profile);
    setWeightEntries(data.weights);
    setDailyNutrition(data.todayNutrition);
    setActiveDate(todayStr);
  }, [todayStr]);

  const resetAllData = useCallback(() => {
    clearAllMYGAINData();
    setProfileState(null);
    setWeightEntries([]);
    const freshDaily = getStoredDailyNutrition(todayStr);
    setDailyNutrition(freshDaily);
  }, [todayStr]);

  // Modal handlers
  const openScanner = useCallback((mealType: MealType = 'lunch') => {
    setActiveMealSlot(mealType);
    setIsScannerOpen(true);
  }, []);

  const closeScanner = useCallback(() => {
    setIsScannerOpen(false);
  }, []);

  const openAddFood = useCallback((mealType: MealType = 'lunch') => {
    setActiveMealSlot(mealType);
    setIsAddFoodOpen(true);
  }, []);

  const closeAddFood = useCallback(() => {
    setIsAddFoodOpen(false);
  }, []);

  const openLogWeight = useCallback(() => {
    setIsLogWeightOpen(true);
  }, []);

  const closeLogWeight = useCallback(() => {
    setIsLogWeightOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      profile,
      targets,
      weightEntries,
      activeDate,
      dailyNutrition,
      weightTrend,
      coachInsights,
      isScannerOpen,
      isAddFoodOpen,
      isLogWeightOpen,
      activeMealSlot,
      setProfile,
      updateProfile,
      setActiveDate,
      addFoodEntry,
      addMultipleFoodEntries,
      updateFoodEntry,
      deleteFoodEntry,
      clearMeal,
      logWeight,
      deleteWeight,
      applySuggestedCalorieAdjustment,
      loadDemoData,
      resetAllData,
      openScanner,
      closeScanner,
      openAddFood,
      closeAddFood,
      openLogWeight,
      closeLogWeight,
    }),
    [
      profile,
      targets,
      weightEntries,
      activeDate,
      dailyNutrition,
      weightTrend,
      coachInsights,
      isScannerOpen,
      isAddFoodOpen,
      isLogWeightOpen,
      activeMealSlot,
      setProfile,
      updateProfile,
      setActiveDate,
      addFoodEntry,
      addMultipleFoodEntries,
      updateFoodEntry,
      deleteFoodEntry,
      clearMeal,
      logWeight,
      deleteWeight,
      applySuggestedCalorieAdjustment,
      loadDemoData,
      resetAllData,
      openScanner,
      closeScanner,
      openAddFood,
      closeAddFood,
      openLogWeight,
      closeLogWeight,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
