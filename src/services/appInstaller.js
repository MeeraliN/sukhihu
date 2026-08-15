/**
 * Instant 1-Click Universal App Installer
 * Immediately triggers PWA browser installation or Android APK download
 * without requiring modal confirmation dialogs.
 */

export function triggerInstantAppInstall() {
  // 1. Check if browser native PWA install prompt is ready
  if (window.deferredPwaPrompt) {
    try {
      window.deferredPwaPrompt.prompt();
      window.deferredPwaPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted PWA installation');
        }
        window.deferredPwaPrompt = null;
      });
      return;
    } catch {
      // Fallback to direct download
    }
  }

  // 2. Auto-detect OS & Device Type
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const platform = navigator.platform || '';

  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isAndroid) {
    // Direct Android APK File Download
    const a = document.createElement('a');
    a.href = './sukhihu-android.apk';
    a.download = 'sukhihu-android.apk';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else if (isIOS) {
    alert('📱 To install sukhihu on iPhone/iPad:\n\n1. Tap the Share icon in Safari\n2. Scroll down and tap "Add to Home Screen"');
  } else {
    // Desktop (Windows x64/32, Mac, Linux)
    alert('🖥️ To Install sukhihu on Desktop:\n\n1. Click the Install App icon in your browser address bar (top right)\n2. Or open Browser Menu (⋮) > "Install sukhihu App"');
  }
}

// Global PWA Event Listener Registration
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPwaPrompt = e;
  });
}
