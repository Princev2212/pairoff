import type { FoodAnalysisResult, DetectedFoodItem, MealType } from '../types';

export interface PresetSampleMeal {
  id: string;
  title: string;
  category: string;
  imageThumbnail: string;
  mealType: MealType;
  items: DetectedFoodItem[];
  uncertaintyNotes: string[];
}

export const PRESET_SAMPLE_MEALS: PresetSampleMeal[] = [
  {
    id: 'preset_thali',
    title: 'Indian High-Protein Thali',
    category: 'Lunch / Dinner',
    imageThumbnail: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=600&auto=format&fit=crop&q=80',
    mealType: 'lunch',
    uncertaintyNotes: [
      'Portion volume estimated using plate perspective (~±12% variance).',
      'Desi ghee / cooking oil estimated at 1.5 tsp across dal and paneer curry.',
      'Refined white rice density calculated at standard 1.3 g/cm³.',
    ],
    items: [
      {
        id: 'det_1',
        name: 'White Rice (Steamed)',
        quantityGrams: 200,
        calories: 260,
        protein: 5.4,
        carbs: 57.0,
        fat: 0.6,
        confidence: 0.94,
        category: 'grains',
        bbox: { x: 30, y: 35, width: 35, height: 35 },
      },
      {
        id: 'det_2',
        name: 'Yellow Dal Tadka',
        quantityGrams: 150,
        calories: 160,
        protein: 8.5,
        carbs: 21.0,
        fat: 4.5,
        confidence: 0.91,
        category: 'protein',
        bbox: { x: 12, y: 15, width: 26, height: 26 },
      },
      {
        id: 'det_3',
        name: 'Paneer Masala Subzi',
        quantityGrams: 140,
        calories: 280,
        protein: 15.2,
        carbs: 8.0,
        fat: 21.0,
        confidence: 0.89,
        category: 'dairy',
        bbox: { x: 62, y: 15, width: 28, height: 28 },
      },
      {
        id: 'det_4',
        name: 'Chapati with Ghee (2 pcs)',
        quantityGrams: 90,
        calories: 290,
        protein: 6.4,
        carbs: 42.0,
        fat: 10.4,
        confidence: 0.93,
        category: 'grains',
        bbox: { x: 10, y: 55, width: 30, height: 30 },
      },
      {
        id: 'det_5',
        name: 'Curd / Dahi (Whole Milk)',
        quantityGrams: 120,
        calories: 88,
        protein: 4.4,
        carbs: 5.4,
        fat: 5.2,
        confidence: 0.96,
        category: 'dairy',
        bbox: { x: 65, y: 55, width: 24, height: 24 },
      },
    ],
  },
  {
    id: 'preset_biryani',
    title: 'Chicken Biryani & Boiled Egg',
    category: 'Dinner / Lunch',
    imageThumbnail: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    mealType: 'dinner',
    uncertaintyNotes: [
      'Ghee & oil in dum biryani estimated at ~14g total fat.',
      'Chicken portion identified as bone-in meat (~140g edible chicken meat).',
      'Raita yogurt base calculated at whole curd density.',
    ],
    items: [
      {
        id: 'det_b1',
        name: 'Hyderabadi Chicken Biryani',
        quantityGrams: 320,
        calories: 560,
        protein: 36.0,
        carbs: 68.0,
        fat: 16.0,
        confidence: 0.92,
        category: 'meals',
        bbox: { x: 20, y: 25, width: 58, height: 55 },
      },
      {
        id: 'det_b2',
        name: 'Whole Boiled Egg (1 pc)',
        quantityGrams: 50,
        calories: 78,
        protein: 6.3,
        carbs: 0.6,
        fat: 5.3,
        confidence: 0.98,
        category: 'protein',
        bbox: { x: 68, y: 20, width: 18, height: 18 },
      },
      {
        id: 'det_b3',
        name: 'Cucumber Onion Raita',
        quantityGrams: 100,
        calories: 75,
        protein: 3.8,
        carbs: 5.2,
        fat: 4.2,
        confidence: 0.90,
        category: 'dairy',
        bbox: { x: 12, y: 15, width: 22, height: 22 },
      },
    ],
  },
  {
    id: 'preset_mass_breakfast',
    title: 'High-Calorie Oatmeal & Eggs Breakfast',
    category: 'Breakfast',
    imageThumbnail: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=600&auto=format&fit=crop&q=80',
    mealType: 'breakfast',
    uncertaintyNotes: [
      'Peanut butter spread thickness estimated at ~2 level tablespoons (32g).',
      'Whole milk liquid volume calibrated to standard 250ml mug.',
    ],
    items: [
      {
        id: 'det_o1',
        name: 'Rolled Oats in Whole Milk',
        quantityGrams: 280,
        calories: 375,
        protein: 15.0,
        carbs: 45.0,
        fat: 15.0,
        confidence: 0.95,
        category: 'grains',
        bbox: { x: 15, y: 20, width: 45, height: 45 },
      },
      {
        id: 'det_o2',
        name: 'Sliced Banana & Honey',
        quantityGrams: 120,
        calories: 125,
        protein: 1.4,
        carbs: 32.0,
        fat: 0.3,
        confidence: 0.96,
        category: 'fruits',
        bbox: { x: 25, y: 30, width: 25, height: 25 },
      },
      {
        id: 'det_o3',
        name: 'Natural Peanut Butter',
        quantityGrams: 32,
        calories: 190,
        protein: 8.0,
        carbs: 7.0,
        fat: 16.0,
        confidence: 0.88,
        category: 'nuts_fats',
        bbox: { x: 38, y: 40, width: 18, height: 18 },
      },
      {
        id: 'det_o4',
        name: 'Boiled Eggs (2 pcs)',
        quantityGrams: 100,
        calories: 155,
        protein: 12.6,
        carbs: 1.1,
        fat: 10.6,
        confidence: 0.97,
        category: 'protein',
        bbox: { x: 65, y: 35, width: 25, height: 35 },
      },
    ],
  },
  {
    id: 'preset_dosa',
    title: 'Crispy Dosa with Sambar & Chutney',
    category: 'Breakfast / Dinner',
    imageThumbnail: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    mealType: 'breakfast',
    uncertaintyNotes: [
      'Coconut chutney fat content calculated at fresh grated coconut standard.',
      'Sambar lentil thickness estimated at medium broth density.',
    ],
    items: [
      {
        id: 'det_d1',
        name: 'Crispy Plain Dosa (2 pcs)',
        quantityGrams: 180,
        calories: 330,
        protein: 7.8,
        carbs: 58.0,
        fat: 7.6,
        confidence: 0.94,
        category: 'grains',
        bbox: { x: 15, y: 20, width: 68, height: 50 },
      },
      {
        id: 'det_d2',
        name: 'Vegetable Sambar',
        quantityGrams: 160,
        calories: 118,
        protein: 4.5,
        carbs: 19.5,
        fat: 2.6,
        confidence: 0.92,
        category: 'vegetables',
        bbox: { x: 15, y: 65, width: 25, height: 25 },
      },
      {
        id: 'det_d3',
        name: 'Fresh Coconut Chutney',
        quantityGrams: 50,
        calories: 140,
        protein: 2.2,
        carbs: 4.5,
        fat: 13.0,
        confidence: 0.90,
        category: 'nuts_fats',
        bbox: { x: 55, y: 65, width: 22, height: 22 },
      },
    ],
  },
];

/**
 * Simulates intelligent multi-stage Vision AI scanning & nutritional estimation.
 * Modular design allows direct swapping with Google Gemini Vision API or custom backend.
 */
export async function analyzeFoodImage(
  imageSource: string | File,
  presetId?: string
): Promise<FoodAnalysisResult> {
  // Simulate neural processing latency (1.2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 1200));

  let matchedPreset = PRESET_SAMPLE_MEALS.find((p) => p.id === presetId);

  // If user uploaded a custom image without preset, generate realistic estimation
  if (!matchedPreset) {
    matchedPreset = PRESET_SAMPLE_MEALS[0]; // fallback realistic meal
  }

  const items = matchedPreset.items.map((item) => ({ ...item }));
  const totalCalories = items.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = Number(items.reduce((acc, curr) => acc + curr.protein, 0).toFixed(1));
  const totalCarbs = Number(items.reduce((acc, curr) => acc + curr.carbs, 0).toFixed(1));
  const totalFat = Number(items.reduce((acc, curr) => acc + curr.fat, 0).toFixed(1));

  const averageConfidence = Number(
    (items.reduce((acc, curr) => acc + curr.confidence, 0) / items.length).toFixed(2)
  );

  const imageUrl = typeof imageSource === 'string' ? imageSource : URL.createObjectURL(imageSource);

  return {
    imageUrl: matchedPreset ? matchedPreset.imageThumbnail : imageUrl,
    items,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    mealTypeSuggestion: matchedPreset.mealType,
    overallConfidence: averageConfidence,
    uncertaintyNotes: matchedPreset.uncertaintyNotes,
    analyzedAt: new Date().toISOString(),
  };
}
