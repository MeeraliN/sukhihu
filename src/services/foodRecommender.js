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
 * Calorie-Efficiency Nutrient Optimizer & Food Recommender
 * Strictly filters foods by dietary preference (Veg users NEVER see Non-Veg/Egg options).
 * Ranks foods based on Nutrient-to-Calorie Ratio (Max nutrients for least calories).
 * Tailors scoring to Weight Goal: Loss (caloric deficit efficiency) vs Gain (calorie-dense clean nutrition).
 */
export function getRecommendedFoods(currentIntake, driTargets, dietFilter = 'veg', activeGoalId = null, weightGoal = 'maintain') {
  if (!currentIntake || !driTargets) return { deficits: [], recommendations: [] };

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

  // 3. Find active health goal object if selected
  const activeGoal = HEALTH_GOALS.find(g => g.id === activeGoalId);
  const goalBoostKeys = activeGoal ? activeGoal.boostNutrients : [];

  // 4. Score each food based on CALORIC EFFICIENCY & NUTRIENT DENSITY
  const scoredFoods = eligibleFoods.map(food => {
    let nutrientFillPoints = 0;
    const keyBenefits = [];

    // Health Goal Boost Points
    if (goalBoostKeys.length > 0) {
      goalBoostKeys.forEach(gKey => {
        const valInFood = food.nutrientsPer100g[gKey] || 0;
        const targetVal = driTargets[gKey]?.target || 1;
        const pctContrib = (valInFood / targetVal) * 100;
        
        if (pctContrib >= 8) {
          nutrientFillPoints += pctContrib * 4.0;
          const label = driTargets[gKey]?.label || gKey;
          keyBenefits.push(`For ${activeGoal.name}: Rich in ${label}`);
        }
      });
    }

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

    // CALORIE EFFICIENCY FORMULA
    // Nutrient Density Ratio = Total Fill Points / Calories per 100g
    let finalScore = 0;
    const nutrientDensityRatio = (nutrientFillPoints / cals100g) * 10;

    if (weightGoal === 'loss') {
      // WEIGHT LOSS MODE: Maximum nutrients per calorie (penalize heavy calories)
      finalScore = nutrientDensityRatio * 15 + (300 - cals100g) * 0.1;
      keyBenefits.unshift(`🔥 Max Nutrients for ${food.nutrientsPer100g.calories} kcal/100g`);
    } else if (weightGoal === 'gain') {
      // WEIGHT GAIN MODE: High clean nutrient fill + clean caloric density
      finalScore = nutrientFillPoints * 1.2 + (cals100g * 0.2);
      keyBenefits.unshift(`💪 Clean Caloric & Nutrient Surplus (${food.nutrientsPer100g.calories} kcal)`);
    } else {
      // MAINTENANCE MODE: Balanced nutrient efficiency
      finalScore = nutrientDensityRatio * 8 + nutrientFillPoints * 0.5;
      keyBenefits.unshift(`⚡ High Calorie-to-Nutrient Efficiency`);
    }

    if (food.practicalDaily) {
      finalScore += 20; // Daily staple practicality bonus
    }

    return {
      ...food,
      score: finalScore,
      nutrientDensityRatio: Math.round(nutrientDensityRatio * 10) / 10,
      benefits: Array.from(new Set(keyBenefits)).slice(0, 3)
    };
  });

  scoredFoods.sort((a, b) => b.score - a.score);

  return {
    deficits: deficitNutrients,
    recommendations: scoredFoods.slice(0, 8),
    activeGoal
  };
}
