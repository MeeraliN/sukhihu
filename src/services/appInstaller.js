/**
 * Direct Instant Executable & App File Downloader
 * Directly starts binary file download (.exe for Windows, .apk for Android)
 * with zero instructions or popups.
 */

export function triggerInstantAppInstall() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isAndroid = /android/i.test(userAgent);
  const isWindows = /win/i.test(navigator.platform || userAgent);

  let downloadFileName = 'sukhihu-setup.exe';
  let downloadUrl = './sukhihu-setup.exe';

  if (isAndroid) {
    downloadFileName = 'sukhihu.apk';
    downloadUrl = './sukhihu.apk';
  } else if (isWindows) {
    downloadFileName = 'sukhihu-setup.exe';
    downloadUrl = './sukhihu-setup.exe';
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
