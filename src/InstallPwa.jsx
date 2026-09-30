import { useEffect, useState, useSyncExternalStore } from 'react';

// ✅ Hoisted outside component — stable reference
const subscribeStandalone = (callback) => {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia('(display-mode: standalone)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};

const getStandaloneSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches;
};

const getServerSnapshot = () => false;

export default function InstallPWA() {
  // ✅ Read standalone status directly — no setState in effect needed
  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getStandaloneSnapshot,
    getServerSnapshot
  );

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [manuallyInstalled, setManuallyInstalled] = useState(false);

  // ✅ Only useEffect for the event listener — no synchronous setState
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // ✅ Inside event callback, not synchronous
    };

    const onInstalled = () => {
      setManuallyInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const isInstalled = isStandalone || manuallyInstalled;

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert(
        'To install: on iOS use Safari → Share → Add to Home Screen. ' +
        'On desktop, use the install icon in your browser address bar.'
      );
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setManuallyInstalled(true);
    setDeferredPrompt(null);
  };

  if (isInstalled) return <p>✅ App is installed!</p>;

  return (
    <button onClick={handleInstallClick} className='cursor-pointer text-[10px] text-white'>
      Install App
    </button>
  );
}