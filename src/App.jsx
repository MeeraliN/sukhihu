import React, { useState, useEffect } from 'react';
import { calculateDRI } from './services/driCalculator';
import { getTrialStatus, getActiveCurrency } from './services/subscriptionService';

import OnboardingWizard from './components/OnboardingWizard';
import Header from './components/Header';
import NutrientDashboard from './components/NutrientDashboard';
import FoodRecommenderView from './components/FoodRecommenderView';
import MealPlannerView from './components/MealPlannerView';
import CameraScannerModal from './components/CameraScannerModal';
import FoodSearchModal from './components/FoodSearchModal';
import ProfileModal from './components/ProfileModal';
import PaywallModal from './components/PaywallModal';
import PaymentCheckoutModal from './components/PaymentCheckoutModal';
import WaterTrackerModal from './components/WaterTrackerModal';
import MealLogHistory from './components/MealLogHistory';
import BottomNav from './components/BottomNav';
import DesktopSidebar from './components/DesktopSidebar';

const STORAGE_KEY_PROFILE = 'sukhihu_user_profile';
const STORAGE_KEY_LOGS = 'sukhihu_daily_meal_logs';
const STORAGE_KEY_WATER_LOGS = 'sukhihu_daily_water_entries';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [driTargets, setDriTargets] = useState(null);
  const [mealLogs, setMealLogs] = useState([]);
  const [waterLogs, setWaterLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trialStatus, setTrialStatus] = useState(getTrialStatus());

  // Modal States
  const [showCamera, setShowCamera] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [checkoutCurrency, setCheckoutCurrency] = useState(getActiveCurrency());

  // 1. Load saved profile, meal logs, and detailed water log entries on mount
  useEffect(() => {
    const savedProfStr = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (savedProfStr) {
      try {
        const prof = JSON.parse(savedProfStr);
        setProfile(prof);
        setDriTargets(calculateDRI(prof));
      } catch {
        // Fallback
      }
    }

    const savedLogsStr = localStorage.getItem(STORAGE_KEY_LOGS);
    if (savedLogsStr) {
      try {
        setMealLogs(JSON.parse(savedLogsStr));
      } catch {
        // Fallback
      }
    }

    const savedWaterEntries = localStorage.getItem(STORAGE_KEY_WATER_LOGS);
    if (savedWaterEntries) {
      try {
        setWaterLogs(JSON.parse(savedWaterEntries));
      } catch {
        // Fallback
      }
    }

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    // Interval to refresh trial status countdown
    const timer = setInterval(() => {
      setTrialStatus(getTrialStatus());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Save profile change
  const handleCompleteOnboarding = (profileData, computedDRI) => {
    setProfile(profileData);
    setDriTargets(computedDRI);
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profileData));
  };

  const handleUpdateProfile = (profileData, computedDRI) => {
    setProfile(profileData);
    const updatedDRI = computedDRI || calculateDRI(profileData);
    setDriTargets(updatedDRI);
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profileData));
  };

  // Add Food Item to Daily Log
  const handleAddFoodToLog = (foodItem, portionGram) => {
    const scaleFactor = portionGram / 100;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newLog = {
      id: Date.now().toString(),
      food: foodItem,
      portionGram,
      timeStr,
      timestamp: now.getTime(),
      computedCalories: Math.round(foodItem.nutrientsPer100g.calories * scaleFactor)
    };

    const updatedLogs = [newLog, ...mealLogs];
    setMealLogs(updatedLogs);
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(updatedLogs));
  };

  const handleDeleteLog = (id) => {
    const updatedLogs = mealLogs.filter(l => l.id !== id);
    setMealLogs(updatedLogs);
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(updatedLogs));
  };

  // Detailed Water Entry Logging & Deletion
  const handleLogWater = (addedMl) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newWaterEntry = {
      id: Date.now().toString(),
      amountMl: Number(addedMl),
      timeStr,
      timestamp: now.getTime()
    };

    const updatedWaterLogs = [newWaterEntry, ...waterLogs];
    setWaterLogs(updatedWaterLogs);
    localStorage.setItem(STORAGE_KEY_WATER_LOGS, JSON.stringify(updatedWaterLogs));
  };

  const handleDeleteWaterLog = (id) => {
    const updatedWaterLogs = waterLogs.filter(w => w.id !== id);
    setWaterLogs(updatedWaterLogs);
    localStorage.setItem(STORAGE_KEY_WATER_LOGS, JSON.stringify(updatedWaterLogs));
  };

  // Sum total water logged
  const totalWaterLoggedMl = waterLogs.reduce((sum, w) => sum + w.amountMl, 0);

  // Aggregate daily nutrients from all logged meals
  const currentIntake = { water: totalWaterLoggedMl };
  if (driTargets) {
    Object.keys(driTargets).forEach(key => {
      if (key !== 'water') currentIntake[key] = 0;
    });

    mealLogs.forEach(log => {
      const scaleFactor = log.portionGram / 100;
      const nutrients = log.food.nutrientsPer100g || {};
      Object.keys(nutrients).forEach(key => {
        if (currentIntake[key] !== undefined && key !== 'water') {
          currentIntake[key] += Math.round((nutrients[key] * scaleFactor) * 10) / 10;
        }
      });
    });
  }

  // Mandatory Onboarding Check
  if (!profile) {
    return <OnboardingWizard onComplete={handleCompleteOnboarding} />;
  }

  const waterTargetMl = driTargets?.water?.target || 3500;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative">
      
      {/* Desktop / Laptop Sidebar Navigation */}
      <DesktopSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'profile') {
            setShowProfile(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenCamera={() => setShowCamera(true)}
        trialStatus={trialStatus}
        onOpenPaywall={() => setShowPaywall(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen max-w-4xl mx-auto w-full border-x border-slate-900 shadow-2xl">
        
        {/* Top Header */}
        <Header
          trialStatus={trialStatus}
          onOpenProfile={() => setShowProfile(true)}
          onOpenCamera={() => setShowCamera(true)}
          onOpenPaywall={() => setShowPaywall(true)}
          onOpenWaterModal={() => setShowWaterModal(true)}
          loggedWaterMl={totalWaterLoggedMl}
          waterTargetMl={waterTargetMl}
          profile={profile}
        />

        {/* Main Screen Router */}
        <main className="flex-1 p-4 md:p-6">
          {activeTab === 'dashboard' && (
            <NutrientDashboard
              currentIntake={currentIntake}
              driTargets={driTargets}
              profile={profile}
              onSearchFood={() => setShowSearch(true)}
              onOpenWaterModal={() => setShowWaterModal(true)}
            />
          )}

          {activeTab === 'recommender' && (
            <FoodRecommenderView
              currentIntake={currentIntake}
              driTargets={driTargets}
              profileDiet={profile.dietaryPreference}
              weightGoal={profile.weightGoal || 'maintain'}
              onAddFoodToLog={handleAddFoodToLog}
            />
          )}

          {activeTab === 'planner' && (
            <MealPlannerView
              profile={profile}
              driTargets={driTargets}
              onAddFoodToLog={handleAddFoodToLog}
            />
          )}

          {activeTab === 'history' && (
            <MealLogHistory
              logs={mealLogs}
              onDeleteLog={handleDeleteLog}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileModal
              onClose={() => setActiveTab('dashboard')}
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              trialStatus={trialStatus}
              onOpenPaywall={() => setShowPaywall(true)}
            />
          )}
        </main>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <BottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              if (tab === 'profile') {
                setShowProfile(true);
              } else {
                setActiveTab(tab);
              }
            }}
            onOpenCamera={() => setShowCamera(true)}
          />
        </div>

      </div>

      {/* MODALS */}
      {showWaterModal && (
        <WaterTrackerModal
          onClose={() => setShowWaterModal(false)}
          waterTargetMl={waterTargetMl}
          loggedWaterMl={totalWaterLoggedMl}
          onLogWater={handleLogWater}
          onDeleteWaterLog={handleDeleteWaterLog}
          waterLogs={waterLogs}
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {showCamera && (
        <CameraScannerModal
          onClose={() => setShowCamera(false)}
          onLogDetectedFood={handleAddFoodToLog}
        />
      )}

      {showSearch && (
        <FoodSearchModal
          onClose={() => setShowSearch(false)}
          onLogFood={handleAddFoodToLog}
          profileDiet={profile.dietaryPreference}
        />
      )}

      {showProfile && (
        <ProfileModal
          onClose={() => setShowProfile(false)}
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          trialStatus={trialStatus}
          onOpenPaywall={() => {
            setShowProfile(false);
            setShowPaywall(true);
          }}
        />
      )}

      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          trialStatus={trialStatus}
          onOpenCheckout={(currency) => {
            setShowPaywall(false);
            setCheckoutCurrency(currency);
            setShowCheckout(true);
          }}
        />
      )}

      {showCheckout && (
        <PaymentCheckoutModal
          onClose={() => setShowCheckout(false)}
          selectedCurrency={checkoutCurrency}
          onSuccess={() => {
            setShowCheckout(false);
            setTrialStatus(getTrialStatus());
          }}
        />
      )}

    </div>
  );
}