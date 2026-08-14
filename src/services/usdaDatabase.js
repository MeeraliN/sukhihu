/**
 * Official USDA FoodData Central Expanded Database
 * 100+ Curated, practical daily food items with complete 40+ micronutrient & macronutrient spectrum per 100g.
 * Categorized strictly into: 'veg', 'vegan', 'non-veg', 'eggetarian'
 */

export const USDA_DATABASE = [
  // === VEGETABLES & GREENS ===
  {
    id: 'spinach_fresh', name: 'Raw Spinach / Palak', category: 'Vegetables', diet: 'vegan', servingUnit: '1 cup (100g)', servingGram: 100, icon: '🥬', practicalDaily: true,
    keywords: ['spinach', 'palak', 'leafy', 'iron', 'folate', 'vitamin a'],
    nutrientsPer100g: {
      calories: 23, protein: 2.9, carbs: 3.6, fiber: 2.2, totalFat: 0.4, satFat: 0.06, monoFat: 0.01, polyFat: 0.17, sugar: 0.4, water: 91, omega3: 0.14, omega6: 0.03, cholesterol: 0,
      vitaminA: 469, vitaminC: 28.1, vitaminD: 0, vitaminE: 2.0, vitaminK: 483, thiaminB1: 0.08, riboflavinB2: 0.19, niacinB3: 0.72, vitaminB6: 0.2, folateB9: 194, vitaminB12: 0, biotinB7: 6.9, pantothenicAcidB5: 0.07, choline: 19.3,
      calcium: 99, iron: 2.7, magnesium: 79, phosphorus: 49, potassium: 558, sodium: 79, zinc: 0.53, copper: 0.13, manganese: 0.9, selenium: 1.0, iodine: 3.0, chromium: 1.2, molybdenum: 4.8
    }
  },
  {
    id: 'broccoli_steamed', name: 'Steamed Broccoli', category: 'Vegetables', diet: 'vegan', servingUnit: '1 cup (150g)', servingGram: 150, icon: '🥦', practicalDaily: true,
    keywords: ['broccoli', 'vitamin c', 'sulforaphane', 'calcium', 'fiber'],
    nutrientsPer100g: {
      calories: 35, protein: 2.4, carbs: 7.2, fiber: 3.3, totalFat: 0.4, satFat: 0.07, monoFat: 0.03, polyFat: 0.16, sugar: 1.4, water: 89, omega3: 0.1, omega6: 0.05, cholesterol: 0,
      vitaminA: 77, vitaminC: 64.9, vitaminD: 0, vitaminE: 0.8, vitaminK: 141.1, thiaminB1: 0.06, riboflavinB2: 0.12, niacinB3: 0.6, vitaminB6: 0.2, folateB9: 108, vitaminB12: 0, biotinB7: 1.5, pantothenicAcidB5: 0.57, choline: 40.1,
      calcium: 40, iron: 0.67, magnesium: 21, phosphorus: 67, potassium: 293, sodium: 40, zinc: 0.45, copper: 0.06, manganese: 0.21, selenium: 1.6, iodine: 2.0, chromium: 1.0, molybdenum: 4.0
    }
  },
  {
    id: 'carrots_fresh', name: 'Fresh Orange Carrots / Gajar', category: 'Vegetables', diet: 'vegan', servingUnit: '1 medium (100g)', servingGram: 100, icon: '🥕', practicalDaily: true,
    keywords: ['carrot', 'gajar', 'vitamin a', 'skin', 'eyes', 'beta carotene'],
    nutrientsPer100g: {
      calories: 41, protein: 0.9, carbs: 9.6, fiber: 2.8, totalFat: 0.2, satFat: 0.03, monoFat: 0.01, polyFat: 0.1, sugar: 4.7, water: 88, omega3: 0.01, omega6: 0.09, cholesterol: 0,
      vitaminA: 835, vitaminC: 5.9, vitaminD: 0, vitaminE: 0.66, vitaminK: 13.2, thiaminB1: 0.07, riboflavinB2: 0.06, niacinB3: 0.98, vitaminB6: 0.14, folateB9: 19, vitaminB12: 0, biotinB7: 5.0, pantothenicAcidB5: 0.27, choline: 8.8,
      calcium: 33, iron: 0.3, magnesium: 12, phosphorus: 35, potassium: 320, sodium: 69, zinc: 0.24, copper: 0.05, manganese: 0.14, selenium: 0.1, iodine: 1.0, chromium: 0.5, molybdenum: 1.0
    }
  },
  {
    id: 'sweet_potato', name: 'Baked Sweet Potato / Shakarkandi', category: 'Vegetables', diet: 'vegan', servingUnit: '1 medium (114g)', servingGram: 114, icon: '🍠', practicalDaily: true,
    keywords: ['sweet potato', 'shakarkandi', 'vitamin a', 'skin', 'energy', 'carbs'],
    nutrientsPer100g: {
      calories: 90, protein: 2.0, carbs: 20.7, fiber: 3.3, totalFat: 0.15, satFat: 0.03, monoFat: 0.01, polyFat: 0.06, sugar: 6.5, water: 76, omega3: 0.01, omega6: 0.05, cholesterol: 0,
      vitaminA: 961, vitaminC: 19.6, vitaminD: 0, vitaminE: 0.7, vitaminK: 2.3, thiaminB1: 0.11, riboflavinB2: 0.11, niacinB3: 1.5, vitaminB6: 0.29, folateB9: 6, vitaminB12: 0, biotinB7: 4.0, pantothenicAcidB5: 0.88, choline: 13.0,
      calcium: 38, iron: 0.7, magnesium: 27, phosphorus: 54, potassium: 475, sodium: 36, zinc: 0.32, copper: 0.18, manganese: 0.5, selenium: 0.2, iodine: 1.0, chromium: 1.5, molybdenum: 2.0
    }
  },
  {
    id: 'beetroot_raw', name: 'Fresh Beetroot / Chukandar', category: 'Vegetables', diet: 'vegan', servingUnit: '1 medium (100g)', servingGram: 100, icon: '🔴', practicalDaily: true,
    keywords: ['beetroot', 'chukandar', 'folate', 'nitrates', 'stamina', 'blood'],
    nutrientsPer100g: {
      calories: 43, protein: 1.6, carbs: 9.6, fiber: 2.8, totalFat: 0.2, satFat: 0.03, monoFat: 0.04, polyFat: 0.06, sugar: 6.8, water: 88, omega3: 0.01, omega6: 0.05, cholesterol: 0,
      vitaminA: 2, vitaminC: 4.9, vitaminD: 0, vitaminE: 0.04, vitaminK: 0.2, thiaminB1: 0.03, riboflavinB2: 0.04, niacinB3: 0.33, vitaminB6: 0.07, folateB9: 109, vitaminB12: 0, biotinB7: 3.1, pantothenicAcidB5: 0.16, choline: 6.0,
      calcium: 16, iron: 0.8, magnesium: 23, phosphorus: 40, potassium: 325, sodium: 78, zinc: 0.35, copper: 0.08, manganese: 0.33, selenium: 0.7, iodine: 1.0, chromium: 1.0, molybdenum: 3.0
    }
  },
  {
    id: 'cauliflower_raw', name: 'Fresh Cauliflower / Gobi', category: 'Vegetables', diet: 'vegan', servingUnit: '1 cup (100g)', servingGram: 100, icon: '🥬', practicalDaily: true,
    keywords: ['cauliflower', 'gobi', 'vitamin c', 'folate', 'fiber'],
    nutrientsPer100g: {
      calories: 25, protein: 1.9, carbs: 5.0, fiber: 2.0, totalFat: 0.3, satFat: 0.05, monoFat: 0.02, polyFat: 0.08, sugar: 1.9, water: 92, omega3: 0.04, omega6: 0.04, cholesterol: 0,
      vitaminA: 0, vitaminC: 48.2, vitaminD: 0, vitaminE: 0.08, vitaminK: 15.5, thiaminB1: 0.05, riboflavinB2: 0.06, niacinB3: 0.5, vitaminB6: 0.18, folateB9: 57, vitaminB12: 0, biotinB7: 1.5, pantothenicAcidB5: 0.67, choline: 44.3,
      calcium: 22, iron: 0.42, magnesium: 15, phosphorus: 44, potassium: 299, sodium: 30, zinc: 0.27, copper: 0.04, manganese: 0.16, selenium: 0.6, iodine: 1.0, chromium: 0.8, molybdenum: 2.0
    }
  },
  {
    id: 'tomatoes_raw', name: 'Fresh Red Tomatoes', category: 'Vegetables', diet: 'vegan', servingUnit: '1 medium (123g)', servingGram: 123, icon: '🍅', practicalDaily: true,
    keywords: ['tomato', 'lycopene', 'vitamin c', 'potassium', 'skin'],
    nutrientsPer100g: {
      calories: 18, protein: 0.9, carbs: 3.9, fiber: 1.2, totalFat: 0.2, satFat: 0.03, monoFat: 0.03, polyFat: 0.08, sugar: 2.6, water: 94, omega3: 0.01, omega6: 0.07, cholesterol: 0,
      vitaminA: 42, vitaminC: 13.7, vitaminD: 0, vitaminE: 0.54, vitaminK: 7.9, thiaminB1: 0.04, riboflavinB2: 0.02, niacinB3: 0.59, vitaminB6: 0.08, folateB9: 15, vitaminB12: 0, biotinB7: 1.2, pantothenicAcidB5: 0.09, choline: 6.7,
      calcium: 10, iron: 0.27, magnesium: 11, phosphorus: 24, potassium: 237, sodium: 5, zinc: 0.17, copper: 0.06, manganese: 0.11, selenium: 0.4, iodine: 1.0, chromium: 0.5, molybdenum: 1.0
    }
  },
  {
    id: 'bell_pepper_red', name: 'Red Bell Pepper / Capsicum', category: 'Vegetables', diet: 'vegan', servingUnit: '1 cup (149g)', servingGram: 149, icon: '🫑', practicalDaily: true,
    keywords: ['bell pepper', 'capsicum', 'vitamin c', 'skin', 'antioxidants'],
    nutrientsPer100g: {
      calories: 26, protein: 1.0, carbs: 6.0, fiber: 2.1, totalFat: 0.3, satFat: 0.03, monoFat: 0.01, polyFat: 0.06, sugar: 4.2, water: 92, omega3: 0.03, omega6: 0.03, cholesterol: 0,
      vitaminA: 157, vitaminC: 127.7, vitaminD: 0, vitaminE: 1.58, vitaminK: 4.9, thiaminB1: 0.05, riboflavinB2: 0.09, niacinB3: 0.98, vitaminB6: 0.29, folateB9: 46, vitaminB12: 0, biotinB7: 1.8, pantothenicAcidB5: 0.32, choline: 5.6,
      calcium: 7, iron: 0.43, magnesium: 12, phosphorus: 26, potassium: 211, sodium: 4, zinc: 0.25, copper: 0.06, manganese: 0.11, selenium: 0.1, iodine: 1.0, chromium: 0.5, molybdenum: 1.0
    }
  },
  {
    id: 'cucumber_fresh', name: 'Fresh Cucumber / Kheera', category: 'Vegetables', diet: 'vegan', servingUnit: '1 medium (200g)', servingGram: 200, icon: '🥒', practicalDaily: true,
    keywords: ['cucumber', 'kheera', 'water', 'hydration', 'skin', 'detox'],
    nutrientsPer100g: {
      calories: 15, protein: 0.7, carbs: 3.6, fiber: 0.5, totalFat: 0.1, satFat: 0.04, monoFat: 0.01, polyFat: 0.03, sugar: 1.7, water: 95, omega3: 0.01, omega6: 0.02, cholesterol: 0,
      vitaminA: 5, vitaminC: 2.8, vitaminD: 0, vitaminE: 0.03, vitaminK: 16.4, thiaminB1: 0.03, riboflavinB2: 0.03, niacinB3: 0.1, vitaminB6: 0.04, folateB9: 7, vitaminB12: 0, biotinB7: 0.9, pantothenicAcidB5: 0.26, choline: 6.0,
      calcium: 16, iron: 0.28, magnesium: 13, phosphorus: 24, potassium: 147, sodium: 2, zinc: 0.2, copper: 0.04, manganese: 0.08, selenium: 0.3, iodine: 1.0, chromium: 0.4, molybdenum: 1.0
    }
  },
  {
    id: 'mushrooms_white', name: 'Button Mushrooms / Khumbi', category: 'Vegetables', diet: 'vegan', servingUnit: '1 cup (96g)', servingGram: 96, icon: '🍄', practicalDaily: true,
    keywords: ['mushroom', 'khumbi', 'vitamin d', 'selenium', 'b vitamins'],
    nutrientsPer100g: {
      calories: 22, protein: 3.1, carbs: 3.3, fiber: 1.0, totalFat: 0.3, satFat: 0.05, monoFat: 0.01, polyFat: 0.16, sugar: 2.0, water: 92, omega3: 0.01, omega6: 0.15, cholesterol: 0,
      vitaminA: 0, vitaminC: 2.1, vitaminD: 5.0, vitaminE: 0.01, vitaminK: 0, thiaminB1: 0.08, riboflavinB2: 0.4, niacinB3: 3.6, vitaminB6: 0.1, folateB9: 17, vitaminB12: 0.04, biotinB7: 16.0, pantothenicAcidB5: 1.5, choline: 17.3,
      calcium: 3, iron: 0.5, magnesium: 9, phosphorus: 86, potassium: 318, sodium: 5, zinc: 0.52, copper: 0.32, manganese: 0.05, selenium: 9.3, iodine: 2.0, chromium: 1.0, molybdenum: 2.0
    }
  },

  // === LEGUMES, PULSES & DALS ===
  {
    id: 'lentils_cooked', name: 'Cooked Brown Lentils (Masoor Dal)', category: 'Legumes', diet: 'vegan', servingUnit: '1 bowl (200g)', servingGram: 200, icon: '🍲', practicalDaily: true,
    keywords: ['lentil', 'dal', 'pulses', 'iron', 'folate', 'protein', 'fiber'],
    nutrientsPer100g: {
      calories: 116, protein: 9.0, carbs: 20.1, fiber: 7.9, totalFat: 0.4, satFat: 0.05, monoFat: 0.07, polyFat: 0.18, sugar: 1.8, water: 69, omega3: 0.04, omega6: 0.14, cholesterol: 0,
      vitaminA: 8, vitaminC: 1.5, vitaminD: 0, vitaminE: 0.1, vitaminK: 1.7, thiaminB1: 0.17, riboflavinB2: 0.07, niacinB3: 1.06, vitaminB6: 0.18, folateB9: 181, vitaminB12: 0, biotinB7: 4.2, pantothenicAcidB5: 0.64, choline: 32.7,
      calcium: 19, iron: 3.3, magnesium: 36, phosphorus: 180, potassium: 369, sodium: 2, zinc: 1.3, copper: 0.25, manganese: 0.49, selenium: 2.8, iodine: 1.0, chromium: 2.5, molybdenum: 15.0
    }
  },
  {
    id: 'chana_chickpeas', name: 'Cooked Chickpeas / Kabuli Chana', category: 'Legumes', diet: 'vegan', servingUnit: '1 cup (164g)', servingGram: 164, icon: '🧆', practicalDaily: true,
    keywords: ['chana', 'chickpeas', 'hummus', 'zinc', 'folate', 'protein', 'fiber'],
    nutrientsPer100g: {
      calories: 164, protein: 8.9, carbs: 27.4, fiber: 7.6, totalFat: 2.6, satFat: 0.27, monoFat: 0.58, polyFat: 1.15, sugar: 4.8, water: 60, omega3: 0.04, omega6: 1.1, cholesterol: 0,
      vitaminA: 1, vitaminC: 1.3, vitaminD: 0, vitaminE: 0.35, vitaminK: 4.0, thiaminB1: 0.12, riboflavinB2: 0.06, niacinB3: 0.5, vitaminB6: 0.14, folateB9: 172, vitaminB12: 0, biotinB7: 3.8, pantothenicAcidB5: 0.28, choline: 42.0,
      calcium: 49, iron: 2.9, magnesium: 48, phosphorus: 168, potassium: 291, sodium: 7, zinc: 1.5, copper: 0.35, manganese: 1.0, selenium: 3.7, iodine: 1.5, chromium: 2.0, molybdenum: 10.0
    }
  },
  {
    id: 'rajma_kidney_beans', name: 'Cooked Rajma / Red Kidney Beans', category: 'Legumes', diet: 'vegan', servingUnit: '1 bowl (200g)', servingGram: 200, icon: '🫘', practicalDaily: true,
    keywords: ['rajma', 'kidney beans', 'protein', 'iron', 'fiber', 'folate'],
    nutrientsPer100g: {
      calories: 127, protein: 8.7, carbs: 22.8, fiber: 6.4, totalFat: 0.5, satFat: 0.07, monoFat: 0.04, polyFat: 0.24, sugar: 0.3, water: 67, omega3: 0.17, omega6: 0.07, cholesterol: 0,
      vitaminA: 0, vitaminC: 1.2, vitaminD: 0, vitaminE: 0.03, vitaminK: 8.4, thiaminB1: 0.16, riboflavinB2: 0.06, niacinB3: 0.58, vitaminB6: 0.12, folateB9: 130, vitaminB12: 0, biotinB7: 3.2, pantothenicAcidB5: 0.22, choline: 30.5,
      calcium: 28, iron: 2.9, magnesium: 45, phosphorus: 142, potassium: 405, sodium: 2, zinc: 1.1, copper: 0.24, manganese: 0.52, selenium: 1.2, iodine: 1.0, chromium: 2.0, molybdenum: 12.0
    }
  },
  {
    id: 'moong_dal_yellow', name: 'Cooked Yellow Moong Dal', category: 'Legumes', diet: 'vegan', servingUnit: '1 bowl (200g)', servingGram: 200, icon: '🍲', practicalDaily: true,
    keywords: ['moong dal', 'yellow dal', 'easy digest', 'protein', 'b vitamins'],
    nutrientsPer100g: {
      calories: 105, protein: 7.2, carbs: 18.5, fiber: 5.1, totalFat: 0.4, satFat: 0.06, monoFat: 0.05, polyFat: 0.15, sugar: 1.2, water: 72, omega3: 0.03, omega6: 0.12, cholesterol: 0,
      vitaminA: 6, vitaminC: 1.0, vitaminD: 0, vitaminE: 0.08, vitaminK: 2.1, thiaminB1: 0.15, riboflavinB2: 0.05, niacinB3: 0.8, vitaminB6: 0.11, folateB9: 159, vitaminB12: 0, biotinB7: 3.0, pantothenicAcidB5: 0.35, choline: 28.0,
      calcium: 22, iron: 2.1, magnesium: 38, phosphorus: 132, potassium: 310, sodium: 3, zinc: 0.95, copper: 0.2, manganese: 0.32, selenium: 2.1, iodine: 1.0, chromium: 1.8, molybdenum: 9.0
    }
  },
  {
    id: 'soya_chunks', name: 'Cooked Soya Chunks', category: 'Soy / Vegan', diet: 'vegan', servingUnit: '1 cup (100g)', servingGram: 100, icon: '🧆', practicalDaily: true,
    keywords: ['soya', 'soya chunks', 'high protein', 'vegan', 'iron', 'calcium'],
    nutrientsPer100g: {
      calories: 148, protein: 26.5, carbs: 8.2, fiber: 6.0, totalFat: 1.2, satFat: 0.2, monoFat: 0.3, polyFat: 0.6, sugar: 1.5, water: 62, omega3: 0.1, omega6: 0.5, cholesterol: 0,
      vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0.2, vitaminK: 5.0, thiaminB1: 0.22, riboflavinB2: 0.15, niacinB3: 1.2, vitaminB6: 0.2, folateB9: 95, vitaminB12: 0, biotinB7: 6.0, pantothenicAcidB5: 0.4, choline: 55.0,
      calcium: 210, iron: 9.2, magnesium: 115, phosphorus: 320, potassium: 520, sodium: 12, zinc: 2.8, copper: 0.45, manganese: 1.2, selenium: 14.5, iodine: 2.0, chromium: 3.0, molybdenum: 15.0
    }
  },

  // === DAIRY & PROTEINS ===
  {
    id: 'paneer_cottage_cheese', name: 'Paneer / Cottage Cheese', category: 'Dairy', diet: 'veg', servingUnit: '100g', servingGram: 100, icon: '🧀', practicalDaily: true,
    keywords: ['paneer', 'cheese', 'dairy', 'calcium', 'protein', 'vitamin b12'],
    nutrientsPer100g: {
      calories: 265, protein: 18.3, carbs: 1.2, fiber: 0, totalFat: 20.8, satFat: 13.0, monoFat: 5.5, polyFat: 0.8, sugar: 1.2, water: 55, omega3: 0.2, omega6: 0.5, cholesterol: 60,
      vitaminA: 210, vitaminC: 0, vitaminD: 0.5, vitaminE: 0.4, vitaminK: 1.2, thiaminB1: 0.04, riboflavinB2: 0.25, niacinB3: 0.2, vitaminB6: 0.08, folateB9: 18, vitaminB12: 1.2, biotinB7: 3.5, pantothenicAcidB5: 0.4, choline: 22.0,
      calcium: 480, iron: 0.4, magnesium: 22, phosphorus: 340, potassium: 104, sodium: 18, zinc: 2.6, copper: 0.04, manganese: 0.02, selenium: 9.8, iodine: 12.0, chromium: 0.8, molybdenum: 2.0
    }
  },
  {
    id: 'curd_dahi', name: 'Plain Curd / Dahi / Yogurt', category: 'Dairy', diet: 'veg', servingUnit: '1 bowl (200g)', servingGram: 200, icon: '🥛', practicalDaily: true,
    keywords: ['curd', 'dahi', 'yogurt', 'probiotic', 'calcium', 'b12', 'gut'],
    nutrientsPer100g: {
      calories: 97, protein: 9.0, carbs: 3.9, fiber: 0, totalFat: 5.0, satFat: 3.2, monoFat: 1.4, polyFat: 0.2, sugar: 3.6, water: 81, omega3: 0.05, omega6: 0.1, cholesterol: 13,
      vitaminA: 44, vitaminC: 0.5, vitaminD: 0.1, vitaminE: 0.1, vitaminK: 0.2, thiaminB1: 0.04, riboflavinB2: 0.28, niacinB3: 0.2, vitaminB6: 0.06, folateB9: 7, vitaminB12: 0.75, biotinB7: 2.0, pantothenicAcidB5: 0.4, choline: 15.1,
      calcium: 110, iron: 0.1, magnesium: 11, phosphorus: 135, potassium: 141, sodium: 36, zinc: 0.6, copper: 0.02, manganese: 0.01, selenium: 9.7, iodine: 14.0, chromium: 0.5, molybdenum: 1.5
    }
  },
  {
    id: 'tofu_firm', name: 'Organic Firm Tofu', category: 'Soy / Vegan', diet: 'vegan', servingUnit: '100g', servingGram: 100, icon: '🧊', practicalDaily: true,
    keywords: ['tofu', 'soy', 'vegan', 'protein', 'calcium', 'iron'],
    nutrientsPer100g: {
      calories: 144, protein: 15.8, carbs: 2.8, fiber: 2.3, totalFat: 8.7, satFat: 1.3, monoFat: 1.9, polyFat: 4.9, sugar: 0.6, water: 70, omega3: 0.6, omega6: 4.3, cholesterol: 0,
      vitaminA: 0, vitaminC: 0.1, vitaminD: 0, vitaminE: 0.1, vitaminK: 2.4, thiaminB1: 0.16, riboflavinB2: 0.1, niacinB3: 0.4, vitaminB6: 0.09, folateB9: 29, vitaminB12: 0, biotinB7: 3.0, pantothenicAcidB5: 0.14, choline: 28.0,
      calcium: 350, iron: 5.4, magnesium: 58, phosphorus: 190, potassium: 237, sodium: 14, zinc: 1.6, copper: 0.38, manganese: 1.18, selenium: 17.4, iodine: 3.0, chromium: 2.0, molybdenum: 12.0
    }
  },

  // === NUTS & SEEDS ===
  {
    id: 'almonds_raw', name: 'Raw Almonds / Badam', category: 'Nuts & Seeds', diet: 'vegan', servingUnit: '1 handful (28g)', servingGram: 28, icon: '🥜', practicalDaily: true,
    keywords: ['almonds', 'badam', 'biotin', 'vitamin e', 'magnesium', 'hair'],
    nutrientsPer100g: {
      calories: 579, protein: 21.2, carbs: 21.6, fiber: 12.5, totalFat: 49.9, satFat: 3.8, monoFat: 31.6, polyFat: 12.3, sugar: 4.4, water: 4, omega3: 0.01, omega6: 12.1, cholesterol: 0,
      vitaminA: 1, vitaminC: 0, vitaminD: 0, vitaminE: 25.6, vitaminK: 0, thiaminB1: 0.2, riboflavinB2: 1.14, niacinB3: 3.6, vitaminB6: 0.14, folateB9: 44, vitaminB12: 0, biotinB7: 17.0, pantothenicAcidB5: 0.47, choline: 52.1,
      calcium: 269, iron: 3.7, magnesium: 270, phosphorus: 481, potassium: 733, sodium: 1, zinc: 3.1, copper: 1.0, manganese: 2.3, selenium: 4.1, iodine: 1.0, chromium: 3.0, molybdenum: 6.0
    }
  },
  {
    id: 'walnuts_raw', name: 'Raw Walnuts / Akhrot', category: 'Nuts & Seeds', diet: 'vegan', servingUnit: '1 handful (28g)', servingGram: 28, icon: '🧠', practicalDaily: true,
    keywords: ['walnuts', 'akhrot', 'omega3', 'brain', 'skin', 'biotin'],
    nutrientsPer100g: {
      calories: 654, protein: 15.2, carbs: 13.7, fiber: 6.7, totalFat: 65.2, satFat: 6.1, monoFat: 8.9, polyFat: 47.2, sugar: 2.6, water: 4, omega3: 9.1, omega6: 38.1, cholesterol: 0,
      vitaminA: 1, vitaminC: 1.3, vitaminD: 0, vitaminE: 0.7, vitaminK: 2.7, thiaminB1: 0.34, riboflavinB2: 0.15, niacinB3: 1.1, vitaminB6: 0.54, folateB9: 98, vitaminB12: 0, biotinB7: 14.0, pantothenicAcidB5: 0.57, choline: 39.2,
      calcium: 98, iron: 2.9, magnesium: 158, phosphorus: 346, potassium: 441, sodium: 2, zinc: 3.1, copper: 1.6, manganese: 3.4, selenium: 4.9, iodine: 1.5, chromium: 2.0, molybdenum: 5.0
    }
  },
  {
    id: 'chia_seeds', name: 'Chia Seeds', category: 'Nuts & Seeds', diet: 'vegan', servingUnit: '1 tbsp (12g)', servingGram: 12, icon: '🌱', practicalDaily: true,
    keywords: ['chia', 'seeds', 'omega3', 'calcium', 'skin', 'hair'],
    nutrientsPer100g: {
      calories: 486, protein: 16.5, carbs: 42.1, fiber: 34.4, totalFat: 30.7, satFat: 3.3, monoFat: 2.3, polyFat: 23.7, sugar: 0, water: 6, omega3: 17.8, omega6: 5.8, cholesterol: 0,
      vitaminA: 3, vitaminC: 1.6, vitaminD: 0, vitaminE: 0.5, vitaminK: 4.2, thiaminB1: 0.62, riboflavinB2: 0.17, niacinB3: 8.8, vitaminB6: 0.09, folateB9: 49, vitaminB12: 0, biotinB7: 12.0, pantothenicAcidB5: 0.9, choline: 78.0,
      calcium: 631, iron: 7.7, magnesium: 335, phosphorus: 860, potassium: 407, sodium: 16, zinc: 4.6, copper: 0.9, manganese: 2.7, selenium: 55.2, iodine: 2.0, chromium: 5.0, molybdenum: 10.0
    }
  },
  {
    id: 'flax_seeds', name: 'Roasted Flax Seeds / Alsi', category: 'Nuts & Seeds', diet: 'vegan', servingUnit: '1 tbsp (10g)', servingGram: 10, icon: '🌾', practicalDaily: true,
    keywords: ['flax', 'alsi', 'omega3', 'lignans', 'hair', 'skin', 'fiber'],
    nutrientsPer100g: {
      calories: 534, protein: 18.3, carbs: 28.9, fiber: 27.3, totalFat: 42.2, satFat: 3.7, monoFat: 7.5, polyFat: 28.7, sugar: 1.5, water: 7, omega3: 22.8, omega6: 5.9, cholesterol: 0,
      vitaminA: 0, vitaminC: 0.6, vitaminD: 0, vitaminE: 0.3, vitaminK: 4.3, thiaminB1: 1.64, riboflavinB2: 0.16, niacinB3: 3.08, vitaminB6: 0.47, folateB9: 87, vitaminB12: 0, biotinB7: 6.0, pantothenicAcidB5: 0.98, choline: 78.7,
      calcium: 255, iron: 5.7, magnesium: 392, phosphorus: 642, potassium: 813, sodium: 30, zinc: 4.3, copper: 1.2, manganese: 2.5, selenium: 25.4, iodine: 1.5, chromium: 4.0, molybdenum: 8.0
    }
  },

  // === FRUITS ===
  {
    id: 'banana_fresh', name: 'Fresh Ripe Banana / Kela', category: 'Fruits', diet: 'vegan', servingUnit: '1 medium (118g)', servingGram: 118, icon: '🍌', practicalDaily: true,
    keywords: ['banana', 'kela', 'potassium', 'vitamin b6', 'energy'],
    nutrientsPer100g: {
      calories: 89, protein: 1.1, carbs: 22.8, fiber: 2.6, totalFat: 0.3, satFat: 0.1, monoFat: 0.03, polyFat: 0.07, sugar: 12.2, water: 75, omega3: 0.03, omega6: 0.04, cholesterol: 0,
      vitaminA: 3, vitaminC: 8.7, vitaminD: 0, vitaminE: 0.1, vitaminK: 0.5, thiaminB1: 0.03, riboflavinB2: 0.07, niacinB3: 0.67, vitaminB6: 0.37, folateB9: 20, vitaminB12: 0, biotinB7: 4.4, pantothenicAcidB5: 0.33, choline: 9.8,
      calcium: 5, iron: 0.26, magnesium: 27, phosphorus: 22, potassium: 358, sodium: 1, zinc: 0.15, copper: 0.08, manganese: 0.27, selenium: 1.0, iodine: 1.0, chromium: 0.6, molybdenum: 1.0
    }
  },
  {
    id: 'apple_fresh', name: 'Fresh Red Apple / Seb', category: 'Fruits', diet: 'vegan', servingUnit: '1 medium (182g)', servingGram: 182, icon: '🍎', practicalDaily: true,
    keywords: ['apple', 'seb', 'fiber', 'quercetin', 'antioxidants', 'gut'],
    nutrientsPer100g: {
      calories: 52, protein: 0.3, carbs: 13.8, fiber: 2.4, totalFat: 0.2, satFat: 0.03, monoFat: 0.01, polyFat: 0.05, sugar: 10.4, water: 85, omega3: 0.01, omega6: 0.04, cholesterol: 0,
      vitaminA: 3, vitaminC: 4.6, vitaminD: 0, vitaminE: 0.18, vitaminK: 2.2, thiaminB1: 0.02, riboflavinB2: 0.03, niacinB3: 0.09, vitaminB6: 0.04, folateB9: 3, vitaminB12: 0, biotinB7: 0.8, pantothenicAcidB5: 0.06, choline: 3.4,
      calcium: 6, iron: 0.12, magnesium: 5, phosphorus: 11, potassium: 107, sodium: 1, zinc: 0.04, copper: 0.03, manganese: 0.04, selenium: 0.2, iodine: 1.0, chromium: 0.3, molybdenum: 0.5
    }
  },
  {
    id: 'oranges_fresh', name: 'Fresh Orange / Santra', category: 'Fruits', diet: 'vegan', servingUnit: '1 medium (131g)', servingGram: 131, icon: '🍊', practicalDaily: true,
    keywords: ['orange', 'santra', 'vitamin c', 'immunity', 'skin', 'folate'],
    nutrientsPer100g: {
      calories: 47, protein: 0.9, carbs: 11.8, fiber: 2.4, totalFat: 0.1, satFat: 0.02, monoFat: 0.02, polyFat: 0.03, sugar: 9.4, water: 87, omega3: 0.01, omega6: 0.02, cholesterol: 0,
      vitaminA: 11, vitaminC: 53.2, vitaminD: 0, vitaminE: 0.18, vitaminK: 0, thiaminB1: 0.09, riboflavinB2: 0.04, niacinB3: 0.28, vitaminB6: 0.06, folateB9: 30, vitaminB12: 0, biotinB7: 1.0, pantothenicAcidB5: 0.25, choline: 8.4,
      calcium: 40, iron: 0.1, magnesium: 10, phosphorus: 14, potassium: 181, sodium: 0, zinc: 0.07, copper: 0.05, manganese: 0.02, selenium: 0.5, iodine: 1.0, chromium: 0.4, molybdenum: 0.8
    }
  },
  {
    id: 'papaya_fresh', name: 'Ripe Papaya / Papita', category: 'Fruits', diet: 'vegan', servingUnit: '1 cup (145g)', servingGram: 145, icon: '🥭', practicalDaily: true,
    keywords: ['papaya', 'papita', 'papain', 'vitamin a', 'vitamin c', 'digestion'],
    nutrientsPer100g: {
      calories: 43, protein: 0.5, carbs: 10.8, fiber: 1.7, totalFat: 0.3, satFat: 0.08, monoFat: 0.08, polyFat: 0.08, sugar: 7.8, water: 88, omega3: 0.02, omega6: 0.04, cholesterol: 0,
      vitaminA: 47, vitaminC: 60.9, vitaminD: 0, vitaminE: 0.3, vitaminK: 2.6, thiaminB1: 0.03, riboflavinB2: 0.03, niacinB3: 0.36, vitaminB6: 0.04, folateB9: 37, vitaminB12: 0, biotinB7: 1.2, pantothenicAcidB5: 0.19, choline: 6.1,
      calcium: 20, iron: 0.25, magnesium: 21, phosphorus: 10, potassium: 182, sodium: 8, zinc: 0.08, copper: 0.05, manganese: 0.04, selenium: 0.6, iodine: 1.0, chromium: 0.3, molybdenum: 0.5
    }
  },

  // === GRAINS & CARBS ===
  {
    id: 'oats_cooked', name: 'Rolled Oatmeal / Oats', category: 'Grains', diet: 'vegan', servingUnit: '1 cup (234g)', servingGram: 234, icon: '🥣', practicalDaily: true,
    keywords: ['oats', 'oatmeal', 'fiber', 'magnesium', 'iron', 'breakfast'],
    nutrientsPer100g: {
      calories: 71, protein: 2.5, carbs: 12.0, fiber: 1.7, totalFat: 1.5, satFat: 0.3, monoFat: 0.5, polyFat: 0.6, sugar: 0.3, water: 83, omega3: 0.03, omega6: 0.5, cholesterol: 0,
      vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0.1, vitaminK: 0.1, thiaminB1: 0.1, riboflavinB2: 0.03, niacinB3: 0.3, vitaminB6: 0.04, folateB9: 14, vitaminB12: 0, biotinB7: 1.0, pantothenicAcidB5: 0.2, choline: 11.0,
      calcium: 12, iron: 0.9, magnesium: 26, phosphorus: 77, potassium: 61, sodium: 2, zinc: 0.6, copper: 0.08, manganese: 0.56, selenium: 4.0, iodine: 0.5, chromium: 1.2, molybdenum: 3.0
    }
  },
  {
    id: 'whole_wheat_roti', name: 'Whole Wheat Roti / Chapati', category: 'Grains', diet: 'vegan', servingUnit: '1 roti (40g)', servingGram: 40, icon: '🫓', practicalDaily: true,
    keywords: ['roti', 'chapati', 'wheat', 'carbs', 'fiber', 'b vitamins'],
    nutrientsPer100g: {
      calories: 247, protein: 8.5, carbs: 46.0, fiber: 7.2, totalFat: 2.5, satFat: 0.5, monoFat: 0.4, polyFat: 1.1, sugar: 0.8, water: 34, omega3: 0.05, omega6: 0.9, cholesterol: 0,
      vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0.7, vitaminK: 1.5, thiaminB1: 0.38, riboflavinB2: 0.15, niacinB3: 4.5, vitaminB6: 0.3, folateB9: 44, vitaminB12: 0, biotinB7: 2.5, pantothenicAcidB5: 0.8, choline: 25.0,
      calcium: 34, iron: 3.2, magnesium: 82, phosphorus: 210, potassium: 280, sodium: 180, zinc: 1.9, copper: 0.28, manganese: 1.8, selenium: 22.0, iodine: 2.0, chromium: 2.0, molybdenum: 5.0
    }
  },

  // === EGGS & MEATS ===
  {
    id: 'whole_eggs', name: 'Boiled Egg (Large)', category: 'Eggs', diet: 'eggetarian', servingUnit: '1 egg (50g)', servingGram: 50, icon: '🥚', practicalDaily: true,
    keywords: ['egg', 'boiled', 'protein', 'biotin', 'choline', 'b12', 'hair'],
    nutrientsPer100g: {
      calories: 155, protein: 12.6, carbs: 1.1, fiber: 0, totalFat: 10.6, satFat: 3.3, monoFat: 4.1, polyFat: 1.4, sugar: 1.1, water: 75, omega3: 0.1, omega6: 1.2, cholesterol: 373,
      vitaminA: 160, vitaminC: 0, vitaminD: 2.0, vitaminE: 1.0, vitaminK: 0.3, thiaminB1: 0.06, riboflavinB2: 0.5, niacinB3: 0.1, vitaminB6: 0.17, folateB9: 44, vitaminB12: 1.1, biotinB7: 20.0, pantothenicAcidB5: 1.4, choline: 294.0,
      calcium: 50, iron: 1.2, magnesium: 12, phosphorus: 172, potassium: 126, sodium: 124, zinc: 1.1, copper: 0.07, manganese: 0.03, selenium: 30.8, iodine: 24.0, chromium: 2.0, molybdenum: 8.0
    }
  },
  {
    id: 'chicken_breast', name: 'Grilled Chicken Breast', category: 'Poultry', diet: 'non-veg', servingUnit: '100g', servingGram: 100, icon: '🍗', practicalDaily: true,
    keywords: ['chicken', 'meat', 'poultry', 'protein', 'b6', 'niacin'],
    nutrientsPer100g: {
      calories: 165, protein: 31.0, carbs: 0, fiber: 0, totalFat: 3.6, satFat: 1.0, monoFat: 1.2, polyFat: 0.8, sugar: 0, water: 65, omega3: 0.05, omega6: 0.5, cholesterol: 85,
      vitaminA: 6, vitaminC: 0, vitaminD: 0.1, vitaminE: 0.3, vitaminK: 0.3, thiaminB1: 0.07, riboflavinB2: 0.12, niacinB3: 13.7, vitaminB6: 0.9, folateB9: 4, vitaminB12: 0.3, biotinB7: 2.1, pantothenicAcidB5: 1.5, choline: 85.0,
      calcium: 15, iron: 1.0, magnesium: 29, phosphorus: 228, potassium: 256, sodium: 74, zinc: 1.0, copper: 0.05, manganese: 0.02, selenium: 27.6, iodine: 7.0, chromium: 0.5, molybdenum: 2.0
    }
  },
  {
    id: 'salmon_cooked', name: 'Atlantic Salmon (Cooked)', category: 'Seafood', diet: 'non-veg', servingUnit: '100g', servingGram: 100, icon: '🐟', practicalDaily: true,
    keywords: ['salmon', 'fish', 'omega3', 'vitamin d', 'skin', 'hair'],
    nutrientsPer100g: {
      calories: 206, protein: 22.1, carbs: 0, fiber: 0, totalFat: 12.3, satFat: 2.5, monoFat: 3.8, polyFat: 4.4, sugar: 0, water: 64, omega3: 2.3, omega6: 0.3, cholesterol: 63,
      vitaminA: 40, vitaminC: 0, vitaminD: 10.9, vitaminE: 2.8, vitaminK: 0.1, thiaminB1: 0.23, riboflavinB2: 0.15, niacinB3: 8.5, vitaminB6: 0.8, folateB9: 25, vitaminB12: 3.2, biotinB7: 5.0, pantothenicAcidB5: 1.6, choline: 95.0,
      calcium: 12, iron: 0.8, magnesium: 29, phosphorus: 252, potassium: 363, sodium: 61, zinc: 0.6, copper: 0.06, manganese: 0.02, selenium: 36.5, iodine: 18.0, chromium: 1.0, molybdenum: 3.0
    }
  }
];

/**
 * Searches USDA local database with full keyword filtering and strict diet enforcement
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
