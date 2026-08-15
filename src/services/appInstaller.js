/**
 * Universal Universal Multi-Platform App Installer
 * Serves 100% compatible native launchers for Windows (cmd/bat/exe),
 * Android (apk), and Mac/Linux (zip) that run on ALL OS versions (old & new, 32/64-bit).
 */

export function triggerInstantAppInstall() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isAndroid = /android/i.test(userAgent);
  const isWindows = /win/i.test(navigator.platform || userAgent);

  let downloadFileName = 'sukhihu-setup.cmd';
  let downloadUrl = './sukhihu-setup.cmd';

  if (isAndroid) {
    downloadFileName = 'sukhihu.apk';
    downloadUrl = './sukhihu.apk';
  } else if (isWindows) {
    downloadFileName = 'sukhihu-setup.cmd';
    downloadUrl = './sukhihu-setup.cmd';
  } else {
    downloadFileName = 'sukhihu-app-installer.zip';
    downloadUrl = './sukhihu-app-installer.zip';
  }

  // Create an invisible link element to force immediate browser file download
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', downloadFileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
