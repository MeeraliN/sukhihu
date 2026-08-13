import React, { useState } from 'react';
import { PAYMENT_GATEWAYS, activateSubscription, getMerchantPaymentConfig, saveMerchantPaymentConfig } from '../services/subscriptionService';
import { CreditCard, CheckCircle2, ShieldCheck, Lock, Settings, ChevronRight } from 'lucide-react';

export default function PaymentCheckoutModal({ onClose, selectedCurrency, onSuccess }) {
  const [selectedGateway, setSelectedGateway] = useState('stripe');
  const [isConfigMode, setIsConfigMode] = useState(false);
  const [merchantConfig, setMerchantConfig] = useState(getMerchantPaymentConfig());
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSaveMerchantConfig = () => {
    saveMerchantPaymentConfig(merchantConfig);
    setIsConfigMode(false);
  };

  const handlePayNow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      activateSubscription();
      setIsProcessing(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col justify-between p-4 max-w-md mx-auto overflow-y-auto">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-sm">Secure Payment Checkout</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-bold text-xs"
        >
          ✕
        </button>
      </div>

      {/* Main Body */}
      {!isConfigMode ? (
        <div className="space-y-4 my-auto">
          
          {/* Order Summary */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">Subscription</span>
              <h4 className="font-extrabold text-slate-100 text-sm">sukhihu PRO Monthly</h4>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-emerald-400">
                {selectedCurrency.symbol}20
              </span>
              <p className="text-[10px] text-slate-400">per month</p>
            </div>
          </div>

          {/* Gateway Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-2 block">
              Select Payment Method
            </label>

            <div className="space-y-2">
              {PAYMENT_GATEWAYS.map((gw) => (
                <div
                  key={gw.id}
                  onClick={() => setSelectedGateway(gw.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    selectedGateway === gw.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-slate-100'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{gw.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-200">{gw.name}</div>
                      <div className="text-[10px] text-slate-400">{gw.desc}</div>
                    </div>
                  </div>
                  {selectedGateway === gw.id && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Config Payout Account Drawer Link */}
          <button
            type="button"
            onClick={() => setIsConfigMode(true)}
            className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-emerald-400 flex items-center justify-between transition"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <Settings className="w-3.5 h-3.5" /> Configure Merchant Destination Account Details
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
            <Lock className="w-3 h-3" />
            <span>256-Bit SSL Encrypted Instant Gateway Processing</span>
          </div>

        </div>
      ) : (
        /* Merchant Payout Destination Config Screen */
        <div className="space-y-4 my-auto animate-in fade-in">
          <div>
            <h4 className="font-bold text-slate-100 text-sm">Merchant Payout Account Setup</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter your receiving payment destination details here. Users' subscription payments will route directly to these accounts.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-semibold mb-1 block">PayPal Receiver Email</label>
              <input
                type="email"
                value={merchantConfig.paypalEmail}
                onChange={(e) => setMerchantConfig({ ...merchantConfig, paypalEmail: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Stripe Public Live Key</label>
              <input
                type="text"
                value={merchantConfig.stripePublicKey}
                onChange={(e) => setMerchantConfig({ ...merchantConfig, stripePublicKey: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">UPI ID (Google Pay / PhonePe)</label>
              <input
                type="text"
                value={merchantConfig.upiId}
                onChange={(e) => setMerchantConfig({ ...merchantConfig, upiId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Bank Account Holder Name</label>
              <input
                type="text"
                value={merchantConfig.bankAccountName}
                onChange={(e) => setMerchantConfig({ ...merchantConfig, bankAccountName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Account Number</label>
                <input
                  type="text"
                  value={merchantConfig.bankAccountNumber}
                  onChange={(e) => setMerchantConfig({ ...merchantConfig, bankAccountNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">IFSC / SWIFT</label>
                <input
                  type="text"
                  value={merchantConfig.bankIfscSwift}
                  onChange={(e) => setMerchantConfig({ ...merchantConfig, bankIfscSwift: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsConfigMode(false)}
              className="flex-1 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 font-semibold rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveMerchantConfig}
              className="flex-1 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs"
            >
              Save Destination Details
            </button>
          </div>
        </div>
      )}

      {/* Pay Action Button */}
      {!isConfigMode && (
        <div className="pt-4">
          <button
            type="button"
            onClick={handlePayNow}
            disabled={isProcessing}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Connecting to Gateway...</span>
            ) : (
              <span>Pay {selectedCurrency.symbol}20 & Activate PRO</span>
            )}
          </button>
        </div>
      )}

    </div>
  );
}
