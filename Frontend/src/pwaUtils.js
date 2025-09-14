// PWA utilities for service worker registration and install prompt

// Register service worker
export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Handle PWA install prompt
let deferredPrompt;

export const initPWAInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button or banner
    showInstallPromotion();
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    hideInstallPromotion();
  });
};

export const showInstallPrompt = async () => {
  if (deferredPrompt) {
    // Show the prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response to the install prompt: ${outcome}`);
    
    // Clear the deferredPrompt variable
    deferredPrompt = null;
    hideInstallPromotion();
  }
};

const showInstallPromotion = () => {
  // You can implement a custom install banner here
  console.log('PWA install available');
};

const hideInstallPromotion = () => {
  // Hide the install banner
  console.log('PWA install promotion hidden');
};
