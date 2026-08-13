/**
 * USDA / National Academy of Medicine (NAM) Dietary Reference Intakes (DRI) Calculator
 * Computes exact daily targets for 40+ macronutrients, vitamins, and minerals
 * based on Height, Weight, Age, Sex, Life Stage, and Activity Level.
 */

export function calculateDRI(profile) {
  const {
    heightCm = 175,
    weightKg = 70,
    age = 28,
    sex = 'male', // 'male' | 'female'
    lifeStage = 'standard', // 'standard' | 'pregnant' | 'lactating'
    activityLevel = 'moderate' // 'sedentary' | 'light' | 'moderate' | 'active' | 'extra'
  } = profile;

  // 1. Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (sex === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // 2. Activity Multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    extra: 1.9
  };

  const activityFactor = activityMultipliers[activityLevel] || 1.55;
  let calories = Math.round(bmr * activityFactor);

  if (lifeStage === 'pregnant') calories += 340;
  if (lifeStage === 'lactating') calories += 450;

  // 3. Protein scaling (1.2g to 2.0g per kg depending on activity)
  const proteinPerKg = activityLevel === 'sedentary' ? 1.0 : (activityLevel === 'active' || activityLevel === 'extra') ? 1.8 : 1.4;
  let protein = Math.round(weightKg * proteinPerKg);
  if (lifeStage === 'pregnant' || lifeStage === 'lactating') protein += 25;

  // 4. Carbs & Fats
  const carbCalories = calories * 0.50; // 50%
  const carbs = Math.round(carbCalories / 4);
  const fiber = Math.round((calories / 1000) * 14); // 14g per 1000 kcal

  const fatCalories = calories * 0.30; // 30%
  const totalFat = Math.round(fatCalories / 9);
  const satFat = Math.round((calories * 0.08) / 9); // <8%
  const monoFat = Math.round((calories * 0.15) / 9);
  const polyFat = Math.round((calories * 0.07) / 9);

  // Water intake (35ml per kg)
  const waterMl = Math.round(weightKg * 35);

  const isMale = sex === 'male';

  return {
    // === MACRONUTRIENTS ===
    calories: { target: calories, unit: 'kcal', label: 'Calories', cat: 'macro' },
    protein: { target: protein, unit: 'g', label: 'Protein', cat: 'macro' },
    carbs: { target: carbs, unit: 'g', label: 'Carbohydrates', cat: 'macro' },
    fiber: { target: fiber, unit: 'g', label: 'Dietary Fiber', cat: 'macro' },
    totalFat: { target: totalFat, unit: 'g', label: 'Total Fats', cat: 'macro' },
    satFat: { target: satFat, unit: 'g', label: 'Saturated Fat', cat: 'macro', upperLimit: Math.round((calories * 0.10) / 9) },
    monoFat: { target: monoFat, unit: 'g', label: 'Monounsaturated Fat', cat: 'macro' },
    polyFat: { target: polyFat, unit: 'g', label: 'Polyunsaturated Fat', cat: 'macro' },
    sugar: { target: 25, unit: 'g', label: 'Added Sugar Max', cat: 'macro', upperLimit: 36 },
    water: { target: waterMl, unit: 'ml', label: 'Water', cat: 'macro' },
    omega3: { target: isMale ? 1.6 : 1.1, unit: 'g', label: 'Omega-3 (ALA)', cat: 'macro' },
    omega6: { target: isMale ? 17 : 12, unit: 'g', label: 'Omega-6 (LA)', cat: 'macro' },
    cholesterol: { target: 200, unit: 'mg', label: 'Cholesterol Max', cat: 'macro', upperLimit: 300 },

    // === VITAMINS ===
    vitaminA: { target: isMale ? 900 : (lifeStage === 'pregnant' ? 770 : 700), unit: 'mcg', label: 'Vitamin A (RAE)', cat: 'vitamin', upperLimit: 3000 },
    vitaminC: { target: isMale ? 90 : (lifeStage === 'pregnant' ? 85 : 75), unit: 'mg', label: 'Vitamin C', cat: 'vitamin', upperLimit: 2000 },
    vitaminD: { target: age > 70 ? 20 : 15, unit: 'mcg', label: 'Vitamin D (600 IU)', cat: 'vitamin', upperLimit: 100 },
    vitaminE: { target: 15, unit: 'mg', label: 'Vitamin E', cat: 'vitamin', upperLimit: 1000 },
    vitaminK: { target: isMale ? 120 : 90, unit: 'mcg', label: 'Vitamin K', cat: 'vitamin' },
    thiaminB1: { target: isMale ? 1.2 : 1.1, unit: 'mg', label: 'Thiamin (B1)', cat: 'vitamin' },
    riboflavinB2: { target: isMale ? 1.3 : 1.1, unit: 'mg', label: 'Riboflavin (B2)', cat: 'vitamin' },
    niacinB3: { target: isMale ? 16 : 14, unit: 'mg', label: 'Niacin (B3)', cat: 'vitamin', upperLimit: 35 },
    vitaminB6: { target: age > 50 ? (isMale ? 1.7 : 1.5) : 1.3, unit: 'mg', label: 'Vitamin B6', cat: 'vitamin', upperLimit: 100 },
    folateB9: { target: lifeStage === 'pregnant' ? 600 : 400, unit: 'mcg', label: 'Folate (B9)', cat: 'vitamin', upperLimit: 1000 },
    vitaminB12: { target: lifeStage === 'pregnant' ? 2.6 : 2.4, unit: 'mcg', label: 'Vitamin B12', cat: 'vitamin' },
    biotinB7: { target: 30, unit: 'mcg', label: 'Biotin (B7)', cat: 'vitamin' },
    pantothenicAcidB5: { target: 5, unit: 'mg', label: 'Pantothenic Acid (B5)', cat: 'vitamin' },
    choline: { target: isMale ? 550 : 425, unit: 'mg', label: 'Choline', cat: 'vitamin', upperLimit: 3500 },

    // === MINERALS & TRACE ELEMENTS ===
    calcium: { target: age > 50 ? 1200 : 1000, unit: 'mg', label: 'Calcium', cat: 'mineral', upperLimit: 2500 },
    iron: { target: lifeStage === 'pregnant' ? 27 : (isMale || age > 50 ? 8 : 18), unit: 'mg', label: 'Iron', cat: 'mineral', upperLimit: 45 },
    magnesium: { target: isMale ? 420 : 320, unit: 'mg', label: 'Magnesium', cat: 'mineral', upperLimit: 350 },
    phosphorus: { target: 700, unit: 'mg', label: 'Phosphorus', cat: 'mineral', upperLimit: 4000 },
    potassium: { target: isMale ? 3400 : 2600, unit: 'mg', label: 'Potassium', cat: 'mineral' },
    sodium: { target: 1500, unit: 'mg', label: 'Sodium Max', cat: 'mineral', upperLimit: 2300 },
    zinc: { target: isMale ? 11 : 8, unit: 'mg', label: 'Zinc', cat: 'mineral', upperLimit: 40 },
    copper: { target: 0.9, unit: 'mg', label: 'Copper', cat: 'mineral', upperLimit: 10 },
    manganese: { target: isMale ? 2.3 : 1.8, unit: 'mg', label: 'Manganese', cat: 'mineral', upperLimit: 11 },
    selenium: { target: 55, unit: 'mcg', label: 'Selenium', cat: 'mineral', upperLimit: 400 },
    iodine: { target: 150, unit: 'mcg', label: 'Iodine', cat: 'mineral', upperLimit: 1100 },
    chromium: { target: isMale ? 35 : 25, unit: 'mcg', label: 'Chromium', cat: 'mineral' },
    molybdenum: { target: 45, unit: 'mcg', label: 'Molybdenum', cat: 'mineral', upperLimit: 2000 }
  };
}

/**
 * Returns Color Status for a given nutrient intake percentage vs target
 * 🔴 RED: Deficient (< 50%) or Excess/Toxic (> 150% or > UL)
 * 🟢 GREEN: Perfect / Optimal (85% - 125%)
 * 🟡 YELLOW: Moderate (50% - 85% or 125% - 150%)
 */
export function getNutrientStatus(current, targetObj) {
  if (!targetObj) return { color: 'slate', code: 'UNKNOWN', label: 'Normal', bg: 'bg-slate-800', text: 'text-slate-300' };

  const { target, upperLimit } = targetObj;
  const ratio = (current / target) * 100;

  // Check Upper Limit Toxicity first if defined
  if (upperLimit && current > upperLimit) {
    return {
      color: 'red',
      code: 'TOXIC',
      label: '⚠️ Exceeds Upper Limit',
      bg: 'bg-red-950/80 border-red-500/50',
      text: 'text-red-400',
      badge: '🔴 Too High (UL Exceeded)'
    };
  }

  if (ratio < 50) {
    return {
      color: 'red',
      code: 'TOO_LESS',
      label: '🔴 Deficient (<50%)',
      bg: 'bg-red-950/40 border-red-500/30',
      text: 'text-red-400',
      badge: '🔴 Too Less'
    };
  } else if (ratio >= 85 && ratio <= 125) {
    return {
      color: 'green',
      code: 'PERFECT',
      label: '🟢 Optimal (Perfect)',
      bg: 'bg-emerald-950/40 border-emerald-500/40',
      text: 'text-emerald-400',
      badge: '🟢 Perfect'
    };
  } else if (ratio > 150) {
    return {
      color: 'red',
      code: 'TOO_MUCH',
      label: '🔴 Too High (>150%)',
      bg: 'bg-rose-950/40 border-rose-500/30',
      text: 'text-rose-400',
      badge: '🔴 Too Much'
    };
  } else {
    return {
      color: 'yellow',
      code: 'MODERATE',
      label: '🟡 Moderate (50-85%)',
      bg: 'bg-amber-950/40 border-amber-500/30',
      text: 'text-amber-400',
      badge: '🟡 Moderate'
    };
  }
}
