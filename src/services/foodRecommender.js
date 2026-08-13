import { USDA_DATABASE } from './usdaDatabase';

/**
 * Health Goal Nutrient Mappings
 * Defines target micronutrients boosted when user chooses a specific health goal / focus area.
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
 * Smart Nutrient Gap Optimizer & Food Recommender
 * Strictly filters foods by dietary preference (Veg users NEVER see Non-Veg/Egg options).
 * Boosts priorities based on selected Health Goal (Hair fall, Acne, Energy, etc.).
 */
export function getRecommendedFoods(currentIntake, driTargets, dietFilter = 'veg', activeGoalId = null) {
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

  // Sort deficit nutrients by lowest percentage achieved first
  deficitNutrients.sort((a, b) => a.percentageAchieved - b.percentageAchieved);

  // 3. Find active health goal object if selected
  const activeGoal = HEALTH_GOALS.find(g => g.id === activeGoalId);
  const goalBoostKeys = activeGoal ? activeGoal.boostNutrients : [];

  // 4. Score each food based on:
  // - Closing active nutrient deficits
  // - Matching active health goal boost nutrients
  // - Practicality score (common daily achievable foods)
  const scoredFoods = eligibleFoods.map(food => {
    let score = 0;
    const keyBenefits = [];

    // Goal Boost Weighting
    if (goalBoostKeys.length > 0) {
      goalBoostKeys.forEach(gKey => {
        const valInFood = food.nutrientsPer100g[gKey] || 0;
        const targetVal = driTargets[gKey]?.target || 1;
        const pctContrib = (valInFood / targetVal) * 100;
        
        if (pctContrib >= 8) {
          score += pctContrib * 3.5; // High priority boost for goal!
          const label = driTargets[gKey]?.label || gKey;
          keyBenefits.push(`Target for ${activeGoal.name}: Rich in ${label}`);
        }
      });
    }

    // Deficit Gap Weighting
    deficitNutrients.forEach(def => {
      const valInFood = food.nutrientsPer100g[def.key] || 0;
      if (valInFood > 0) {
        const urgencyWeight = (100 - def.percentageAchieved) / 10;
        const contribution = (valInFood / (driTargets[def.key]?.target || 1)) * 100;
        
        if (contribution >= 5) {
          score += contribution * urgencyWeight;
          keyBenefits.push(`Fills ${def.label} (+${valInFood}${def.unit})`);
        }
      }
    });

    // Practicality bonus for common daily achievable foods
    if (food.practicalDaily) {
      score += 15;
    }

    return {
      ...food,
      score,
      benefits: Array.from(new Set(keyBenefits)).slice(0, 3)
    };
  });

  // Sort foods by score descending
  scoredFoods.sort((a, b) => b.score - a.score);

  return {
    deficits: deficitNutrients,
    recommendations: scoredFoods.slice(0, 8),
    activeGoal
  };
}
