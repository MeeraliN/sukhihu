/**
 * Subscription & Paywall Management Service for 'sukhihu'
 * Features:
 * 1. 1-Day (24-Hour) Free Trial Countdown starting from user onboarding completion.
 * 2. Fixed '20' price unit formatted into localized country currencies ($20, €20, ₹20, £20, A$20, ¥20).
 * 3. Multi-gateway checkout handlers: PayPal, Stripe Card, UPI (GPay/PhonePe), Bank Transfer, Apple/Google Pay.
 * 4. Merchant account payout configuration store.
 */

const STORAGE_KEY_TRIAL = 'sukhihu_trial_start_time';
const STORAGE_KEY_SUB = 'sukhihu_subscription_status';
const STORAGE_KEY_CURRENCY = 'sukhihu_selected_currency';
const STORAGE_KEY_PAYMENT_CONFIG = 'sukhihu_payment_config';

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 20 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 20 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 20 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 20 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 20 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 20 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 20 },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 20 }
];

export const PAYMENT_GATEWAYS = [
  { id: 'stripe', name: 'Credit / Debit Card', provider: 'Stripe', icon: '💳', desc: 'Visa, MasterCard, Amex' },
  { id: 'paypal', name: 'PayPal Checkout', provider: 'PayPal', icon: '🅿️', desc: 'Fast international checkout' },
  { id: 'upi', name: 'UPI / QR Code', provider: 'GPay / PhonePe / Paytm', icon: '📱', desc: 'Instant UPI transfer' },
  { id: 'bank', name: 'Direct Bank Wire / SWIFT', provider: 'Bank Transfer', icon: '🏛️', desc: 'Direct account deposit' },
  { id: 'gpay_apple', name: 'Google Pay / Apple Pay', provider: 'Digital Wallet', icon: '🍏', desc: '1-Tap Mobile Wallet' }
];

/**
 * Initializes or gets the trial start timestamp (24 Hours free trial)
 */
export function getTrialStatus() {
  let startTimeStr = localStorage.getItem(STORAGE_KEY_TRIAL);
  if (!startTimeStr) {
    startTimeStr = Date.now().toString();
    localStorage.setItem(STORAGE_KEY_TRIAL, startTimeStr);
  }

  const startTime = parseInt(startTimeStr, 10);
  const now = Date.now();
  const trialDurationMs = 24 * 60 * 60 * 1000; // 24 hours in ms
  const elapsedMs = now - startTime;
  const remainingMs = Math.max(0, trialDurationMs - elapsedMs);

  const isExpired = remainingMs <= 0;
  const isSubscribed = localStorage.getItem(STORAGE_KEY_SUB) === 'active';

  const hoursLeft = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutesLeft = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    isSubscribed,
    isExpired,
    isTrialActive: !isExpired && !isSubscribed,
    remainingMs,
    formattedTimeLeft: `${hoursLeft}h ${minutesLeft}m`,
    startTime
  };
}

/**
 * Gets currently selected currency object
 */
export function getActiveCurrency() {
  const savedCode = localStorage.getItem(STORAGE_KEY_CURRENCY) || 'USD';
  return CURRENCIES.find(c => c.code === savedCode) || CURRENCIES[0];
}

/**
 * Sets selected currency
 */
export function setActiveCurrency(code) {
  localStorage.setItem(STORAGE_KEY_CURRENCY, code);
}

/**
 * Activate PRO subscription
 */
export function activateSubscription() {
  localStorage.setItem(STORAGE_KEY_SUB, 'active');
}

/**
 * Get / Save Merchant Destination Payment Accounts
 */
export function getMerchantPaymentConfig() {
  const data = localStorage.getItem(STORAGE_KEY_PAYMENT_CONFIG);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      // fallback
    }
  }
  return {
    paypalEmail: 'merchant@sukhihu.app',
    stripePublicKey: 'pk_live_sample_sukhihu_key',
    upiId: 'sukhihu@upi',
    bankAccountName: 'sukhihu Health Ltd',
    bankAccountNumber: '998877665544',
    bankIfscSwift: 'SUKH0001234'
  };
}

export function saveMerchantPaymentConfig(config) {
  localStorage.setItem(STORAGE_KEY_PAYMENT_CONFIG, JSON.stringify(config));
}
