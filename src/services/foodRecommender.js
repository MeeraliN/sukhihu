import { USDA_DATABASE } from './usdaDatabase';

/**
 * Health Goal Nutrient Mappings
 */
export const HEALTH_GOALS = [
  {
    id: 'hair_fall',
    name: 'Hair Growth & Anti-Hair Fall',
    icon: '💇',
    boostNutrients: ['biotinB7', 'zinc', 'iron', 'protein', 'vitaminD', 'vitaminE', 'selenium'],
    desc: 'Targets Hair Follicle Strength, Keratin Production & Scalp Health'
  },
  {
    id: 'acne_skin',
    name: 'Clear Skin & Anti-Acne',
    icon: '✨',
    boostNutrients: ['vitaminA', 'vitaminC', 'zinc', 'vitaminE', 'omega3', 'water', 'selenium'],
    desc: 'Targets Collagen Synthesis, Sebum Regulation & Glow'
  },
  {
    id: 'weight_loss',
    name: 'Weight Loss & Fat Burn',
    icon: '📉',
    boostNutrients: ['fiber', 'protein', 'water', 'vitaminC', 'calcium', 'chromium', 'magnesium'],
    desc: 'Prioritizes Maximum Satiety & Micronutrients with Lowest Calories'
  },
  {
    id: 'weight_gain',
    name: 'Weight Gain & Muscle Building',
    icon: '📈',
    boostNutrients: ['protein', 'carbs', 'totalFat', 'vitaminB12', 'zinc', 'iron', 'phosphorus'],
    desc: 'Prioritizes Clean Nutrient Surplus for Healthy Weight & Muscle Mass'
  },
  {
    id: 'energy_fatigue',
    name: 'Energy Boost & Anti-Fatigue',
    icon: '⚡',
    boostNutrients: ['vitaminB12', 'iron', 'magnesium', 'thiaminB1', 'riboflavinB2', 'potassium'],
    desc: 'Targets Red Blood Cell Oxygenation & Cellular ATP Production'
  },
  {
    id: 'bone_health',
    name: 'Bone & Joint Strength',
    icon: '🦴',
    boostNutrients: ['calcium', 'vitaminD', 'vitaminK', 'magnesium', 'phosphorus'],
    desc: 'Targets Bone Mineral Density & Cartilage Renewal'
  },
  {
    id: 'immunity',
    name: 'Immunity & Infection Defense',
    icon: '🛡️',
    boostNutrients: ['vitaminC', 'zinc', 'vitaminD', 'vitaminA', 'selenium', 'copper'],
    desc: 'Targets White Blood Cell Activity & Antioxidant Shield'
  },
  {
    id: 'brain_focus',
    name: 'Brain Focus & Mental Clarity',
    icon: '🧠',
    boostNutrients: ['omega3', 'choline', 'vitaminB6', 'folateB9', 'magnesium', 'iron'],
    desc: 'Targets Neurotransmitter Synthesis & Memory Support'
  }
];

/**
 * Calorie-Aware Nutrient Optimizer & Food Recommender
 * Generates an explicit "Caloric Impact Note" for every food item (e.g. 100g Sesame seeds = 573 kcal, 975mg Calcium).
 * Calculates recommended calorie-budget-friendly portion sizes (e.g. 25g portion = 143 kcal for 244mg Calcium).
 */
export function getRecommendedFoods(currentIntake, driTargets, dietFilter = 'veg', activeGoalId = 'hair_fall', weightGoal = 'maintain') {
  if (!currentIntake || !driTargets) return { deficits: [], recommendations: [] };

  const targetDailyCalories = driTargets.calories?.target || 2000;
  const loggedCalories = currentIntake.calories || 0;
  const remainingCalories = Math.max(100, targetDailyCalories - loggedCalories);

  // 1. Filter USDA database strictly by user's active dietary choice
  const eligibleFoods = USDA_DATABASE.filter(item => {
    if (dietFilter === 'vegan') return item.diet === 'vegan';
    if (dietFilter === 'veg') return item.diet === 'vegan' || item.diet === 'veg';
    if (dietFilter === 'eggetarian') return item.diet === 'vegan' || item.diet === 'veg' || item.diet === 'eggetarian';
    return true; // 'non-veg' allows all
  });

  // 2. Identify active nutrient deficits (< 80% of DRI target)
  const deficitNutrients = [];
  
  Object.keys(driTargets).forEach(key => {
    const targetObj = driTargets[key];
    const loggedVal = currentIntake[key] || 0;
    const ratio = (loggedVal / targetObj.target) * 100;
    
    if (ratio < 80) {
      deficitNutrients.push({
        key,
        label: targetObj.label,
        unit: targetObj.unit,
        category: targetObj.cat,
        missingAmount: targetObj.target - loggedVal,
        percentageAchieved: ratio
      });
    }
  });

  deficitNutrients.sort((a, b) => a.percentageAchieved - b.percentageAchieved);

  // 3. Find active health goal object
  const activeGoal = HEALTH_GOALS.find(g => g.id === activeGoalId) || HEALTH_GOALS[0];
  const goalBoostKeys = activeGoal.boostNutrients;

  // 4. Score each food based on CALORIC EFFICIENCY, GOAL BOOST & CALORIC IMPACT
  const scoredFoods = eligibleFoods.map(food => {
    let nutrientFillPoints = 0;
    const keyBenefits = [];

    // Health Goal Boost Points
    goalBoostKeys.forEach(gKey => {
      const valInFood = food.nutrientsPer100g[gKey] || 0;
      const targetVal = driTargets[gKey]?.target || 1;
      const pctContrib = (valInFood / targetVal) * 100;
      
      if (pctContrib >= 5) {
        nutrientFillPoints += pctContrib * 5.0;
        const label = driTargets[gKey]?.label || gKey;
        keyBenefits.push(`For ${activeGoal.name}: Rich in ${label}`);
      }
    });

    // Deficit Gap Fill Points
    deficitNutrients.forEach(def => {
      const valInFood = food.nutrientsPer100g[def.key] || 0;
      if (valInFood > 0) {
        const urgencyWeight = (100 - def.percentageAchieved) / 10;
        const contribution = (valInFood / (driTargets[def.key]?.target || 1)) * 100;
        
        if (contribution >= 5) {
          nutrientFillPoints += contribution * urgencyWeight;
          keyBenefits.push(`Fills ${def.label} (+${valInFood}${def.unit})`);
        }
      }
    });

    const cals100g = Math.max(15, food.nutrientsPer100g.calories);

    // CALORIE EFFICIENCY & BUDGET PORTION CALCULATION
    // e.g. 100g Sesame Seeds = 573 kcal & 975mg Calcium
    // Smart Suggested Portion = 25g (143 kcal) giving 244mg Calcium safely
    let suggestedPortionGrams = 100;
    if (cals100g > 350) {
      suggestedPortionGrams = 25; // Small portion for dense seeds/nuts
    } else if (cals100g > 180) {
      suggestedPortionGrams = 50; // Medium portion for paneer/meats
    } else {
      suggestedPortionGrams = 150; // Larger portion for greens/vegetables
    }

    const suggestedCalories = Math.round((cals100g * suggestedPortionGrams) / 100);
    const suggestedPctBudget = Math.round((suggestedCalories / targetDailyCalories) * 100);

    // Primary micronutrient highlight for note (e.g. Calcium in sesame seeds)
    const topNutrientKey = goalBoostKeys[0] || deficitNutrients[0]?.key || 'calcium';
    const topNutrientVal100g = food.nutrientsPer100g[topNutrientKey] || food.nutrientsPer100g.calcium || 0;
    const topNutrientName = driTargets[topNutrientKey]?.label || 'Calcium';
    const topNutrientUnit = driTargets[topNutrientKey]?.unit || 'mg';

    const topNutrientSuggestedVal = Math.round((topNutrientVal100g * suggestedPortionGrams) / 100);

    // PERFECT CALORIC IMPACT NOTE
    const calorieImpactNote = `⚠️ Caloric Note: 100g contains ${cals100g} kcal (${topNutrientVal100g}${topNutrientUnit} ${topNutrientName}). Recommended portion: ${suggestedPortionGrams}g adds ${suggestedCalories} kcal (${suggestedPctBudget}% of ${targetDailyCalories} kcal daily budget) for ${topNutrientSuggestedVal}${topNutrientUnit} ${topNutrientName}.`;

    let finalScore = 0;
    const nutrientDensityRatio = (nutrientFillPoints / cals100g) * 10;

    if (weightGoal === 'loss' || activeGoalId === 'weight_loss') {
      finalScore = nutrientDensityRatio * 18 + (300 - cals100g) * 0.15;
    } else if (weightGoal === 'gain' || activeGoalId === 'weight_gain') {
      finalScore = nutrientFillPoints * 1.5 + (cals100g * 0.3);
    } else {
      finalScore = nutrientDensityRatio * 10 + nutrientFillPoints * 0.6;
    }

    if (food.practicalDaily) {
      finalScore += 25;
    }

    return {
      ...food,
      score: finalScore,
      suggestedPortionGrams,
      suggestedCalories,
      suggestedPctBudget,
      calorieImpactNote,
      nutrientDensityRatio: Math.round(nutrientDensityRatio * 10) / 10,
      benefits: Array.from(new Set(keyBenefits)).slice(0, 3)
    };
  });

  scoredFoods.sort((a, b) => b.score - a.score);

  return {
    deficits: deficitNutrients,
    recommendations: scoredFoods.slice(0, 10),
    activeGoal,
    targetDailyCalories,
    loggedCalories,
    remainingCalories
  };
}
