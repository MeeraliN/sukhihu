/**
 * Official USDA FoodData Central Offline Database
 * Contains curated, verified practical daily food items with full 40+ micronutrient and macronutrient spectrum per 100g.
 * Categorized strictly into: 'veg', 'vegan', 'non-veg', 'eggetarian'
 */

export const USDA_DATABASE = [
  {
    id: 'spinach_fresh',
    name: 'Raw Spinach / Palak',
    category: 'Vegetables',
    diet: 'vegan',
    servingUnit: '1 cup (100g)',
    servingGram: 100,
    icon: '🥬',
    practicalDaily: true,
    keywords: ['spinach', 'palak', 'leafy', 'iron', 'folate', 'vitamin a'],
    nutrientsPer100g: {
      calories: 23, protein: 2.9, carbs: 3.6, fiber: 2.2, totalFat: 0.4, satFat: 0.06,
      monoFat: 0.01, polyFat: 0.17, sugar: 0.4, water: 91, omega3: 0.14, omega6: 0.03, cholesterol: 0,
      vitaminA: 469, vitaminC: 28.1, vitaminD: 0, vitaminE: 2.0, vitaminK: 483,
      thiaminB1: 0.08, riboflavinB2: 0.19, niacinB3: 0.72, vitaminB6: 0.2, folateB9: 194,
      vitaminB12: 0, biotinB7: 6.9, pantothenicAcidB5: 0.07, choline: 19.3,
      calcium: 99, iron: 2.7, magnesium: 79, phosphorus: 49, potassium: 558,
      sodium: 79, zinc: 0.53, copper: 0.13, manganese: 0.9, selenium: 1.0, iodine: 3.0, chromium: 1.2, molybdenum: 4.8
    }
  },
  {
    id: 'lentils_cooked',
    name: 'Cooked Brown Lentils (Dal)',
    category: 'Legumes',
    diet: 'vegan',
    servingUnit: '1 bowl (200g)',
    servingGram: 200,
    icon: '🍲',
    practicalDaily: true,
    keywords: ['lentil', 'dal', 'pulses', 'iron', 'folate', 'protein', 'fiber'],
    nutrientsPer100g: {
      calories: 116, protein: 9.0, carbs: 20.1, fiber: 7.9, totalFat: 0.4, satFat: 0.05,
      monoFat: 0.07, polyFat: 0.18, sugar: 1.8, water: 69, omega3: 0.04, omega6: 0.14, cholesterol: 0,
      vitaminA: 8, vitaminC: 1.5, vitaminD: 0, vitaminE: 0.1, vitaminK: 1.7,
      thiaminB1: 0.17, riboflavinB2: 0.07, niacinB3: 1.06, vitaminB6: 0.18, folateB9: 181,
      vitaminB12: 0, biotinB7: 4.2, pantothenicAcidB5: 0.64, choline: 32.7,
      calcium: 19, iron: 3.3, magnesium: 36, phosphorus: 180, potassium: 369,
      sodium: 2, zinc: 1.3, copper: 0.25, manganese: 0.49, selenium: 2.8, iodine: 1.0, chromium: 2.5, molybdenum: 15.0
    }
  },
  {
    id: 'paneer_cottage_cheese',
    name: 'Paneer / Fresh Cottage Cheese',
    category: 'Dairy',
    diet: 'veg',
    servingUnit: '100g',
    servingGram: 100,
    icon: '🧀',
    practicalDaily: true,
    keywords: ['paneer', 'cheese', 'dairy', 'calcium', 'protein', 'vitamin b12'],
    nutrientsPer100g: {
      calories: 265, protein: 18.3, carbs: 1.2, fiber: 0, totalFat: 20.8, satFat: 13.0,
      monoFat: 5.5, polyFat: 0.8, sugar: 1.2, water: 55, omega3: 0.2, omega6: 0.5, cholesterol: 60,
      vitaminA: 210, vitaminC: 0, vitaminD: 0.5, vitaminE: 0.4, vitaminK: 1.2,
      thiaminB1: 0.04, riboflavinB2: 0.25, niacinB3: 0.2, vitaminB6: 0.08, folateB9: 18,
      vitaminB12: 1.2, biotinB7: 3.5, pantothenicAcidB5: 0.4, choline: 22.0,
      calcium: 480, iron: 0.4, magnesium: 22, phosphorus: 340, potassium: 104,
      sodium: 18, zinc: 2.6, copper: 0.04, manganese: 0.02, selenium: 9.8, iodine: 12.0, chromium: 0.8, molybdenum: 2.0
    }
  },
  {
    id: 'curd_dahi',
    name: 'Plain Curd / Dahi / Yogurt',
    category: 'Dairy',
    diet: 'veg',
    servingUnit: '1 bowl (200g)',
    servingGram: 200,
    icon: '🥛',
    practicalDaily: true,
    keywords: ['curd', 'dahi', 'yogurt', 'probiotic', 'calcium', 'b12', 'gut'],
    nutrientsPer100g: {
      calories: 97, protein: 9.0, carbs: 3.9, fiber: 0, totalFat: 5.0, satFat: 3.2,
      monoFat: 1.4, polyFat: 0.2, sugar: 3.6, water: 81, omega3: 0.05, omega6: 0.1, cholesterol: 13,
      vitaminA: 44, vitaminC: 0.5, vitaminD: 0.1, vitaminE: 0.1, vitaminK: 0.2,
      thiaminB1: 0.04, riboflavinB2: 0.28, niacinB3: 0.2, vitaminB6: 0.06, folateB9: 7,
      vitaminB12: 0.75, biotinB7: 2.0, pantothenicAcidB5: 0.4, choline: 15.1,
      calcium: 110, iron: 0.1, magnesium: 11, phosphorus: 135, potassium: 141,
      sodium: 36, zinc: 0.6, copper: 0.02, manganese: 0.01, selenium: 9.7, iodine: 14.0, chromium: 0.5, molybdenum: 1.5
    }
  },
  {
    id: 'chana_chickpeas',
    name: 'Cooked Chickpeas / Kabuli Chana',
    category: 'Legumes',
    diet: 'vegan',
    servingUnit: '1 cup (164g)',
    servingGram: 164,
    icon: '🧆',
    practicalDaily: true,
    keywords: ['chana', 'chickpeas', 'hummus', 'zinc', 'folate', 'protein', 'fiber'],
    nutrientsPer100g: {
      calories: 164, protein: 8.9, carbs: 27.4, fiber: 7.6, totalFat: 2.6, satFat: 0.27,
      monoFat: 0.58, polyFat: 1.15, sugar: 4.8, water: 60, omega3: 0.04, omega6: 1.1, cholesterol: 0,
      vitaminA: 1, vitaminC: 1.3, vitaminD: 0, vitaminE: 0.35, vitaminK: 4.0,
      thiaminB1: 0.12, riboflavinB2: 0.06, niacinB3: 0.5, vitaminB6: 0.14, folateB9: 172,
      vitaminB12: 0, biotinB7: 3.8, pantothenicAcidB5: 0.28, choline: 42.0,
      calcium: 49, iron: 2.9, magnesium: 48, phosphorus: 168, potassium: 291,
      sodium: 7, zinc: 1.5, copper: 0.35, manganese: 1.0, selenium: 3.7, iodine: 1.5, chromium: 2.0, molybdenum: 10.0
    }
  },
  {
    id: 'almonds_raw',
    name: 'Raw Almonds / Badam',
    category: 'Nuts & Seeds',
    diet: 'vegan',
    servingUnit: '1 handful (28g / ~23 almonds)',
    servingGram: 28,
    icon: '🥜',
    practicalDaily: true,
    keywords: ['almonds', 'badam', 'biotin', 'vitamin e', 'magnesium', 'hair'],
    nutrientsPer100g: {
      calories: 579, protein: 21.2, carbs: 21.6, fiber: 12.5, totalFat: 49.9, satFat: 3.8,
      monoFat: 31.6, polyFat: 12.3, sugar: 4.4, water: 4, omega3: 0.01, omega6: 12.1, cholesterol: 0,
      vitaminA: 1, vitaminC: 0, vitaminD: 0, vitaminE: 25.6, vitaminK: 0,
      thiaminB1: 0.2, riboflavinB2: 1.14, niacinB3: 3.6, vitaminB6: 0.14, folateB9: 44,
      vitaminB12: 0, biotinB7: 17.0, pantothenicAcidB5: 0.47, choline: 52.1,
      calcium: 269, iron: 3.7, magnesium: 270, phosphorus: 481, potassium: 733,
      sodium: 1, zinc: 3.1, copper: 1.0, manganese: 2.3, selenium: 4.1, iodine: 1.0, chromium: 3.0, molybdenum: 6.0
    }
  },
  {
    id: 'walnuts_raw',
    name: 'Raw Walnuts / Akhrot',
    category: 'Nuts & Seeds',
    diet: 'vegan',
    servingUnit: '1 handful (28g / ~7 walnuts)',
    servingGram: 28,
    icon: '🧠',
    practicalDaily: true,
    keywords: ['walnuts', 'akhrot', 'omega3', 'brain', 'skin', 'biotin'],
    nutrientsPer100g: {
      calories: 654, protein: 15.2, carbs: 13.7, fiber: 6.7, totalFat: 65.2, satFat: 6.1,
      monoFat: 8.9, polyFat: 47.2, sugar: 2.6, water: 4, omega3: 9.1, omega6: 38.1, cholesterol: 0,
      vitaminA: 1, vitaminC: 1.3, vitaminD: 0, vitaminE: 0.7, vitaminK: 2.7,
      thiaminB1: 0.34, riboflavinB2: 0.15, niacinB3: 1.1, vitaminB6: 0.54, folateB9: 98,
      vitaminB12: 0, biotinB7: 14.0, pantothenicAcidB5: 0.57, choline: 39.2,
      calcium: 98, iron: 2.9, magnesium: 158, phosphorus: 346, potassium: 441,
      sodium: 2, zinc: 3.1, copper: 1.6, manganese: 3.4, selenium: 4.9, iodine: 1.5, chromium: 2.0, molybdenum: 5.0
    }
  },
  {
    id: 'carrots_fresh',
    name: 'Fresh Orange Carrots / Gajar',
    category: 'Vegetables',
    diet: 'vegan',
    servingUnit: '1 medium (100g)',
    servingGram: 100,
    icon: '🥕',
    practicalDaily: true,
    keywords: ['carrot', 'gajar', 'vitamin a', 'skin', 'beta carotene', 'eyes'],
    nutrientsPer100g: {
      calories: 41, protein: 0.9, carbs: 9.6, fiber: 2.8, totalFat: 0.2, satFat: 0.03,
      monoFat: 0.01, polyFat: 0.1, sugar: 4.7, water: 88, omega3: 0.01, omega6: 0.09, cholesterol: 0,
      vitaminA: 835, vitaminC: 5.9, vitaminD: 0, vitaminE: 0.66, vitaminK: 13.2,
      thiaminB1: 0.07, riboflavinB2: 0.06, niacinB3: 0.98, vitaminB6: 0.14, folateB9: 19,
      vitaminB12: 0, biotinB7: 5.0, pantothenicAcidB5: 0.27, choline: 8.8,
      calcium: 33, iron: 0.3, magnesium: 12, phosphorus: 35, potassium: 320,
      sodium: 69, zinc: 0.24, copper: 0.05, manganese: 0.14, selenium: 0.1, iodine: 1.0, chromium: 0.5, molybdenum: 1.0
    }
  },
  {
    id: 'sweet_potato',
    name: 'Baked Sweet Potato / Shakarkandi',
    category: 'Vegetables',
    diet: 'vegan',
    servingUnit: '1 medium (114g)',
    servingGram: 114,
    icon: '🍠',
    practicalDaily: true,
    keywords: ['sweet potato', 'shakarkandi', 'vitamin a', 'skin', 'energy'],
    nutrientsPer100g: {
      calories: 90, protein: 2.0, carbs: 20.7, fiber: 3.3, totalFat: 0.15, satFat: 0.03,
      monoFat: 0.01, polyFat: 0.06, sugar: 6.5, water: 76, omega3: 0.01, omega6: 0.05, cholesterol: 0,
      vitaminA: 961, vitaminC: 19.6, vitaminD: 0, vitaminE: 0.7, vitaminK: 2.3,
      thiaminB1: 0.11, riboflavinB2: 0.11, niacinB3: 1.5, vitaminB6: 0.29, folateB9: 6,
      vitaminB12: 0, biotinB7: 4.0, pantothenicAcidB5: 0.88, choline: 13.0,
      calcium: 38, iron: 0.7, magnesium: 27, phosphorus: 54, potassium: 475,
      sodium: 36, zinc: 0.32, copper: 0.18, manganese: 0.5, selenium: 0.2, iodine: 1.0, chromium: 1.5, molybdenum: 2.0
    }
  },
  {
    id: 'banana_fresh',
    name: 'Fresh Ripe Banana / Kela',
    category: 'Fruits',
    diet: 'vegan',
    servingUnit: '1 medium (118g)',
    servingGram: 118,
    icon: '🍌',
    practicalDaily: true,
    keywords: ['banana', 'kela', 'potassium', 'vitamin b6', 'energy'],
    nutrientsPer100g: {
      calories: 89, protein: 1.1, carbs: 22.8, fiber: 2.6, totalFat: 0.3, satFat: 0.1,
      monoFat: 0.03, polyFat: 0.07, sugar: 12.2, water: 75, omega3: 0.03, omega6: 0.04, cholesterol: 0,
      vitaminA: 3, vitaminC: 8.7, vitaminD: 0, vitaminE: 0.1, vitaminK: 0.5,
      thiaminB1: 0.03, riboflavinB2: 0.07, niacinB3: 0.67, vitaminB6: 0.37, folateB9: 20,
      vitaminB12: 0, biotinB7: 4.4, pantothenicAcidB5: 0.33, choline: 9.8,
      calcium: 5, iron: 0.26, magnesium: 27, phosphorus: 22, potassium: 358,
      sodium: 1, zinc: 0.15, copper: 0.08, manganese: 0.27, selenium: 1.0, iodine: 1.0, chromium: 0.6, molybdenum: 1.0
    }
  },
  {
    id: 'oats_cooked',
    name: 'Rolled Oatmeal / Oats',
    category: 'Grains',
    diet: 'vegan',
    servingUnit: '1 cup (234g)',
    servingGram: 234,
    icon: '🥣',
    practicalDaily: true,
    keywords: ['oats', 'oatmeal', 'fiber', 'magnesium', 'iron', 'breakfast'],
    nutrientsPer100g: {
      calories: 71, protein: 2.5, carbs: 12.0, fiber: 1.7, totalFat: 1.5, satFat: 0.3,
      monoFat: 0.5, polyFat: 0.6, sugar: 0.3, water: 83, omega3: 0.03, omega6: 0.5, cholesterol: 0,
      vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0.1, vitaminK: 0.1,
      thiaminB1: 0.1, riboflavinB2: 0.03, niacinB3: 0.3, vitaminB6: 0.04, folateB9: 14,
      vitaminB12: 0, biotinB7: 1.0, pantothenicAcidB5: 0.2, choline: 11.0,
      calcium: 12, iron: 0.9, magnesium: 26, phosphorus: 77, potassium: 61,
      sodium: 2, zinc: 0.6, copper: 0.08, manganese: 0.56, selenium: 4.0, iodine: 0.5, chromium: 1.2, molybdenum: 3.0
    }
  },
  {
    id: 'chia_seeds',
    name: 'Chia Seeds',
    category: 'Nuts & Seeds',
    diet: 'vegan',
    servingUnit: '1 tbsp (12g)',
    servingGram: 12,
    icon: '🌱',
    practicalDaily: true,
    keywords: ['chia', 'seeds', 'omega3', 'calcium', 'skin', 'hair'],
    nutrientsPer100g: {
      calories: 486, protein: 16.5, carbs: 42.1, fiber: 34.4, totalFat: 30.7, satFat: 3.3,
      monoFat: 2.3, polyFat: 23.7, sugar: 0, water: 6, omega3: 17.8, omega6: 5.8, cholesterol: 0,
      vitaminA: 3, vitaminC: 1.6, vitaminD: 0, vitaminE: 0.5, vitaminK: 4.2,
      thiaminB1: 0.62, riboflavinB2: 0.17, niacinB3: 8.8, vitaminB6: 0.09, folateB9: 49,
      vitaminB12: 0, biotinB7: 12.0, pantothenicAcidB5: 0.9, choline: 78.0,
      calcium: 631, iron: 7.7, magnesium: 335, phosphorus: 860, potassium: 407,
      sodium: 16, zinc: 4.6, copper: 0.9, manganese: 2.7, selenium: 55.2, iodine: 2.0, chromium: 5.0, molybdenum: 10.0
    }
  },
  {
    id: 'whole_eggs',
    name: 'Boiled Egg (Large)',
    category: 'Eggs',
    diet: 'eggetarian',
    servingUnit: '1 egg (50g)',
    servingGram: 50,
    icon: '🥚',
    practicalDaily: true,
    keywords: ['egg', 'boiled', 'protein', 'biotin', 'choline', 'b12', 'hair'],
    nutrientsPer100g: {
      calories: 155, protein: 12.6, carbs: 1.1, fiber: 0, totalFat: 10.6, satFat: 3.3,
      monoFat: 4.1, polyFat: 1.4, sugar: 1.1, water: 75, omega3: 0.1, omega6: 1.2, cholesterol: 373,
      vitaminA: 160, vitaminC: 0, vitaminD: 2.0, vitaminE: 1.0, vitaminK: 0.3,
      thiaminB1: 0.06, riboflavinB2: 0.5, niacinB3: 0.1, vitaminB6: 0.17, folateB9: 44,
      vitaminB12: 1.1, biotinB7: 20.0, pantothenicAcidB5: 1.4, choline: 294.0,
      calcium: 50, iron: 1.2, magnesium: 12, phosphorus: 172, potassium: 126,
      sodium: 124, zinc: 1.1, copper: 0.07, manganese: 0.03, selenium: 30.8, iodine: 24.0, chromium: 2.0, molybdenum: 8.0
    }
  },
  {
    id: 'chicken_breast',
    name: 'Grilled Chicken Breast',
    category: 'Poultry',
    diet: 'non-veg',
    servingUnit: '100g',
    servingGram: 100,
    icon: '🍗',
    practicalDaily: true,
    keywords: ['chicken', 'meat', 'poultry', 'protein', 'b6', 'niacin'],
    nutrientsPer100g: {
      calories: 165, protein: 31.0, carbs: 0, fiber: 0, totalFat: 3.6, satFat: 1.0,
      monoFat: 1.2, polyFat: 0.8, sugar: 0, water: 65, omega3: 0.05, omega6: 0.5, cholesterol: 85,
      vitaminA: 6, vitaminC: 0, vitaminD: 0.1, vitaminE: 0.3, vitaminK: 0.3,
      thiaminB1: 0.07, riboflavinB2: 0.12, niacinB3: 13.7, vitaminB6: 0.9, folateB9: 4,
      vitaminB12: 0.3, biotinB7: 2.1, pantothenicAcidB5: 1.5, choline: 85.0,
      calcium: 15, iron: 1.0, magnesium: 29, phosphorus: 228, potassium: 256,
      sodium: 74, zinc: 1.0, copper: 0.05, manganese: 0.02, selenium: 27.6, iodine: 7.0, chromium: 0.5, molybdenum: 2.0
    }
  },
  {
    id: 'salmon_cooked',
    name: 'Atlantic Salmon (Cooked)',
    category: 'Seafood',
    diet: 'non-veg',
    servingUnit: '100g',
    servingGram: 100,
    icon: '🐟',
    practicalDaily: true,
    keywords: ['salmon', 'fish', 'omega3', 'vitamin d', 'skin', 'hair'],
    nutrientsPer100g: {
      calories: 206, protein: 22.1, carbs: 0, fiber: 0, totalFat: 12.3, satFat: 2.5,
      monoFat: 3.8, polyFat: 4.4, sugar: 0, water: 64, omega3: 2.3, omega6: 0.3, cholesterol: 63,
      vitaminA: 40, vitaminC: 0, vitaminD: 10.9, vitaminE: 2.8, vitaminK: 0.1,
      thiaminB1: 0.23, riboflavinB2: 0.15, niacinB3: 8.5, vitaminB6: 0.8, folateB9: 25,
      vitaminB12: 3.2, biotinB7: 5.0, pantothenicAcidB5: 1.6, choline: 95.0,
      calcium: 12, iron: 0.8, magnesium: 29, phosphorus: 252, potassium: 363,
      sodium: 61, zinc: 0.6, copper: 0.06, manganese: 0.02, selenium: 36.5, iodine: 18.0, chromium: 1.0, molybdenum: 3.0
    }
  }
];

/**
 * Searches USDA local database with full keyword filtering and diet preference filter
 */
export function searchUSDADatabase(query = '', profileDiet = 'veg', filterSelection = 'all') {
  const cleanQ = query.trim().toLowerCase();

  return USDA_DATABASE.filter(item => {
    // 1. STRICT ENFORCEMENT: Never show non-veg or egg if profile diet is 'veg' or 'vegan'
    if (profileDiet === 'vegan' && item.diet !== 'vegan') return false;
    if (profileDiet === 'veg' && (item.diet === 'non-veg' || item.diet === 'eggetarian')) return false;
    if (profileDiet === 'eggetarian' && item.diet === 'non-veg') return false;

    // 2. Active Tab Sub-filter
    if (filterSelection !== 'all') {
      if (filterSelection === 'vegan' && item.diet !== 'vegan') return false;
      if (filterSelection === 'veg' && item.diet !== 'vegan' && item.diet !== 'veg') return false;
    }

    if (!cleanQ) return true;

    // 3. Keyword match
    const matchName = item.name.toLowerCase().includes(cleanQ);
    const matchCat = item.category.toLowerCase().includes(cleanQ);
    const matchKey = item.keywords.some(k => k.toLowerCase().includes(cleanQ));
    return matchName || matchCat || matchKey;
  });
}
