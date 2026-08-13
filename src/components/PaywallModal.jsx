import React, { useState } from 'react';
import { CURRENCIES, getActiveCurrency, setActiveCurrency, PAYMENT_GATEWAYS, getMerchantPaymentConfig } from '../services/subscriptionService';
import { Crown, Sparkles, CheckCircle2, ShieldCheck, CreditCard, ChevronRight, Globe, Lock } from 'lucide-react';

export default function PaywallModal({ onClose, trialStatus, onOpenCheckout }) {
  const [selectedCurrency, setSelectedCurrency] = useState(getActiveCurrency());

  const handleCurrencyChange = (code) => {
    setActiveCurrency(code);
    const curr = CURRENCIES.find(c => c.code === code);
    if (curr) setSelectedCurrency(curr);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col justify-between p-5 max-w-md mx-auto overflow-y-auto">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950">
            <Crown className="w-5 h-5 fill-slate-950" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm">sukhihu PRO</h3>
            <p className="text-[10px] text-amber-400 font-semibold">1-Day Trial & Global Membership</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-bold text-xs"
        >
          ✕
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-4 my-auto">
        
        {/* Trial Alert Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
          <Sparkles className="w-5 h-5 shrink-0" />
          <div>
            <span className="font-bold">1-Day Free Access Active</span>
            <p className="text-[11px] text-amber-300/80 mt-0.5">
              Trial status: {trialStatus?.formattedTimeLeft || '24h'} remaining. Upgrade now for uninterrupted 24/7 access.
            </p>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="p-5 rounded-3xl glass-card border border-amber-500/40 bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 text-center space-y-3 relative overflow-hidden">
          
          <div className="flex justify-center">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-extrabold uppercase tracking-wider">
              Fixed Global Price
            </span>
          </div>

          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-black text-slate-100">{selectedCurrency.symbol}20</span>
            <span className="text-sm font-semibold text-slate-400">/ month</span>
          </div>

          <p className="text-xs text-slate-400">
            Flat price of 20 in all countries, formatted automatically to your local currency.
          </p>

          {/* Local Currency Selector */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCurrency.code}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-amber-400 font-bold focus:outline-none"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol}20 {c.code} ({c.name})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Features List */}
        <div className="space-y-2">
          {[
            'Unlimited Zero-Cost AI Camera Photo Scans',
            'Full 40+ Micronutrient & Macronutrient Spectrum',
            'Official USDA FoodData Central 100% Accuracy',
            'Strict Veg, Vegan, Eggetarian & Non-Veg Recommender',
            'Multi-Gateway Checkout (PayPal, Card, UPI, Bank)',
            '24/7 Automated Operation (Zero Human Overhead)'
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Action Buttons */}
      <div className="pt-4 space-y-2">
        <button
          type="button"
          onClick={() => onOpenCheckout(selectedCurrency)}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition active:scale-95"
        >
          <Crown className="w-4 h-4 fill-slate-950" />
          <span>Subscribe Now ({selectedCurrency.symbol}20/mo)</span>
        </button>
      </div>

    </div>
  );
}
