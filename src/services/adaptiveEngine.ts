import type { WeightEntry, WeightTrendEvaluation, WeightTrendPoint, TrendStatus } from '../types';

/**
 * Calculates rolling 7-day moving averages and trendline data for charting
 */
export function calculateWeightTrendPoints(
  entries: WeightEntry[],
  targetWeightKg: number
): WeightTrendPoint[] {
  if (!entries || entries.length === 0) return [];

  // Sort chronologically ascending
  const sorted = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return sorted.map((entry, index) => {
    // Window of up to 7 days including current
    const startIdx = Math.max(0, index - 6);
    const window = sorted.slice(startIdx, index + 1);
    const sum = window.reduce((acc, curr) => acc + curr.weightKg, 0);
    const avg = Number((sum / window.length).toFixed(2));

    const dateObj = new Date(entry.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    return {
      date: entry.date,
      weightKg: entry.weightKg,
      movingAverage7Day: window.length >= 3 ? avg : entry.weightKg,
      targetWeightKg,
      formattedDate,
    };
  });
}

/**
 * Evaluates 7-day moving average trends against target gain rates and provides adaptive calorie recommendations
 */
export function evaluateWeightTrend(
  entries: WeightEntry[],
  currentWeightKg: number,
  targetWeightKg: number,
  initialWeightKg?: number
): WeightTrendEvaluation {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ); // descending (newest first)

  const startingWeight = initialWeightKg || (sorted.length > 0 ? sorted[sorted.length - 1].weightKg : currentWeightKg);
  const latestWeight = sorted.length > 0 ? sorted[0].weightKg : currentWeightKg;
  const totalGainedKg = Number((latestWeight - startingWeight).toFixed(2));
  const remainingKg = Number(Math.max(0, targetWeightKg - latestWeight).toFixed(2));
  
  const totalTargetGain = targetWeightKg - startingWeight;
  const progressPercentage = totalTargetGain > 0
    ? Math.min(100, Math.max(0, Math.round((totalGainedKg / totalTargetGain) * 100)))
    : 0;

  // Need at least 4 entries for a minimal baseline
  if (sorted.length < 4) {
    return {
      currentWeightKg: latestWeight,
      startingWeightKg: startingWeight,
      targetWeightKg,
      totalGainedKg,
      remainingKg,
      progressPercentage,
      current7DayAverageKg: null,
      previous7DayAverageKg: null,
      weeklyChangeKg: null,
      weeklyChangePercent: null,
      status: 'insufficient_data',
      statusHeadline: 'Calibrating 7-Day Baseline',
      recommendation:
        'Log your weight consistently across at least 4–7 days. The engine uses rolling 7-day averages to eliminate daily water and digestive fluctuations before suggesting adjustments.',
      suggestedCalorieAdjustment: 0,
      confidence: 'low',
    };
  }

  // Current 7-day window (latest 7 logs)
  const currentWeekLogs = sorted.slice(0, 7);
  const current7DayAverage = Number(
    (currentWeekLogs.reduce((acc, curr) => acc + curr.weightKg, 0) / currentWeekLogs.length).toFixed(2)
  );

  // Previous 7-day window (logs 7 through 13)
  const previousWeekLogs = sorted.slice(7, 14);
  let previous7DayAverage: number | null = null;
  let weeklyChangeKg: number | null = null;
  let weeklyChangePercent: number | null = null;

  if (previousWeekLogs.length >= 3) {
    previous7DayAverage = Number(
      (previousWeekLogs.reduce((acc, curr) => acc + curr.weightKg, 0) / previousWeekLogs.length).toFixed(2)
    );
    weeklyChangeKg = Number((current7DayAverage - previous7DayAverage).toFixed(2));
    weeklyChangePercent = Number(((weeklyChangeKg / previous7DayAverage) * 100).toFixed(2));
  } else {
    // Estimate from early logs if we have between 4 and 10 logs
    const earliestLog = sorted[sorted.length - 1];
    const daysDiff = Math.max(1, (new Date(sorted[0].date).getTime() - new Date(earliestLog.date).getTime()) / (1000 * 3600 * 24));
    const normalizedWeeklyChange = ((latestWeight - earliestLog.weightKg) / daysDiff) * 7;
    weeklyChangeKg = Number(normalizedWeeklyChange.toFixed(2));
    weeklyChangePercent = Number(((weeklyChangeKg / earliestLog.weightKg) * 100).toFixed(2));
  }

  let status: TrendStatus = 'on_track';
  let statusHeadline = 'Your progress is on track';
  let recommendation = 'Your weight gain rate is within the targeted 0.25%–0.50% range. Protein and calorie surplus are dialed in.';
  let suggestedCalorieAdjustment = 0;
  let confidence: 'high' | 'medium' | 'low' = previousWeekLogs.length >= 5 ? 'high' : 'medium';

  // Benchmark target: 0.25% - 0.50% of bodyweight per week
  if (weeklyChangePercent !== null) {
    if (weeklyChangePercent < 0.20) {
      status = 'below_target';
      statusHeadline = 'Your weight trend is below your target range';
      recommendation =
        'Your rolling weight average indicates a slower gain rate than the 0.25%–0.50% weekly target. We recommend a gentle +150 kcal daily adjustment with healthy energy-dense foods (e.g. nuts, peanut butter, extra paneer or oats).';
      suggestedCalorieAdjustment = 150;
    } else if (weeklyChangePercent > 0.55) {
      status = 'above_target';
      statusHeadline = 'Your weight is increasing faster than planned';
      recommendation =
        'Gaining faster than 0.55% of bodyweight per week increases the proportion of fat versus lean muscle. We recommend slightly trimming your daily surplus by -100 kcal to maintain lean tissue accrual.';
      suggestedCalorieAdjustment = -100;
    } else {
      status = 'on_track';
      statusHeadline = 'Your progress is on track';
      recommendation =
        'Your weekly average is steadily climbing within the optimal 0.25%–0.50% lean growth window. Keep your current calorie surplus consistent.';
      suggestedCalorieAdjustment = 0;
    }
  }

  return {
    currentWeightKg: latestWeight,
    startingWeightKg: startingWeight,
    targetWeightKg,
    totalGainedKg,
    remainingKg,
    progressPercentage,
    current7DayAverageKg: current7DayAverage,
    previous7DayAverageKg: previous7DayAverage,
    weeklyChangeKg,
    weeklyChangePercent,
    status,
    statusHeadline,
    recommendation,
    suggestedCalorieAdjustment,
    confidence,
  };
}
