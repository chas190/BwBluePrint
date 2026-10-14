import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useUser } from '@clerk/clerk-react';

interface UserSettings {
  buttonToggles: any[];
  localDealsToggles: any[];
  showExtraCards: boolean;
  transparentCard1FadedColor: boolean;
  transparentCard2FadedColor: boolean;
  transparentCard3FadedColor: boolean;
  showBwTownVipPerksCard: boolean;
  showDiscoverDealsTitle: boolean;
  showBigNewsTitle: boolean;
  bigNewsTitle: string;
  lastPage: string;
  theme: string;
}

const defaultSettings: UserSettings = {
  buttonToggles: [
    { id: 'amazon', title: 'Amazon', visible: true },
    { id: 'shop-online', title: 'Shop Online', visible: true },
    { id: 'specials', title: 'Specials', visible: true },
    { id: 'vip-benefits', title: 'VIP Benefits', visible: true },
    { id: 'home-deals', title: 'Home Deals', visible: true },
    { id: 'upbank', title: 'UpBank', visible: true },
    { id: 'mega-buys', title: 'Mega Buys', visible: true },
    { id: 'capital-creation', title: 'Capital Creation', visible: true }
  ],
  localDealsToggles: [
    { id: 'food', title: 'Food', visible: true },
    { id: 'retail', title: 'Retail', visible: true },
    { id: 'online-shopping', title: 'Online Shopping', visible: true },
    { id: 'pets', title: 'Pets', visible: true },
    { id: 'clothes', title: 'Clothes', visible: true },
    { id: 'services', title: 'Services', visible: true },
    { id: 'auto', title: 'Auto', visible: true },
    { id: 'home', title: 'Home', visible: true },
    { id: 'health', title: 'Health', visible: true },
    { id: 'card', title: 'Card', visible: true },
    { id: 'local-cafe-express', title: 'Local Cafe Express', visible: true },
    { id: 'tech-store-plus', title: 'Tech Store Plus', visible: true },
    { id: 'fashion-forward', title: 'Fashion Forward', visible: true }
  ],
  showExtraCards: true,
  transparentCard1FadedColor: true,
  transparentCard2FadedColor: true,
  transparentCard3FadedColor: true,
  showBwTownVipPerksCard: false,
  showDiscoverDealsTitle: false,
  showBigNewsTitle: false,
  bigNewsTitle: 'big news',
  lastPage: '/main',
  theme: 'system'
};

export const useSettingsPersistence = () => {
  const { user } = useUser();
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  const getSettingsKey = useCallback((key: string) => {
    return user ? `bucksup_${user.id}_${key}` : `bucksup_guest_${key}`;
  }, [user]);

  // Load settings on mount and user change
  useEffect(() => {
    const loadSettings = () => {
      try {
        // Load from cookies (persistent across sessions)
        const cookieSettings = Cookies.get(getSettingsKey('settings'));
        if (cookieSettings) {
          const parsed = JSON.parse(cookieSettings);
          setSettings({ ...defaultSettings, ...parsed });
          return;
        }

        // Fallback to localStorage for backwards compatibility
        const localSettings = {
          buttonToggles: localStorage.getItem('main11_buttonToggles'),
          localDealsToggles: localStorage.getItem('main11_localDealsToggles'),
          showExtraCards: localStorage.getItem('devSettings_showExtraTransparentCards'),
          transparentCard1FadedColor: localStorage.getItem('devSettings_transparentCard1FadedColor'),
          transparentCard2FadedColor: localStorage.getItem('devSettings_transparentCard2FadedColor'),
          transparentCard3FadedColor: localStorage.getItem('devSettings_transparentCard3FadedColor'),
          showBwTownVipPerksCard: localStorage.getItem('devSettings_showBwTownVipPerksCard'),
        };

        const mergedSettings = { ...defaultSettings };
        
        if (localSettings.buttonToggles) {
          mergedSettings.buttonToggles = JSON.parse(localSettings.buttonToggles);
        }
        if (localSettings.localDealsToggles) {
          mergedSettings.localDealsToggles = JSON.parse(localSettings.localDealsToggles);
        }
        if (localSettings.showExtraCards !== null) {
          mergedSettings.showExtraCards = JSON.parse(localSettings.showExtraCards);
        }
        if (localSettings.transparentCard1FadedColor !== null) {
          mergedSettings.transparentCard1FadedColor = JSON.parse(localSettings.transparentCard1FadedColor);
        }
        if (localSettings.transparentCard2FadedColor !== null) {
          mergedSettings.transparentCard2FadedColor = JSON.parse(localSettings.transparentCard2FadedColor);
        }
        if (localSettings.transparentCard3FadedColor !== null) {
          mergedSettings.transparentCard3FadedColor = JSON.parse(localSettings.transparentCard3FadedColor);
        }
        if (localSettings.showBwTownVipPerksCard !== null) {
          mergedSettings.showBwTownVipPerksCard = JSON.parse(localSettings.showBwTownVipPerksCard);
        }

        setSettings(mergedSettings);
        
        // Migrate to cookies
        saveSettings(mergedSettings);
      } catch (error) {
        console.error('Error loading settings:', error);
        setSettings(defaultSettings);
      }
    };

    loadSettings();
  }, [user, getSettingsKey]);

  const saveSettings = useCallback((newSettings: Partial<UserSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    try {
      // Save to cookies (30 days expiry)
      Cookies.set(getSettingsKey('settings'), JSON.stringify(updatedSettings), { expires: 30 });
      
      // Also save to localStorage for backwards compatibility and performance
      localStorage.setItem('main11_buttonToggles', JSON.stringify(updatedSettings.buttonToggles));
      localStorage.setItem('main11_localDealsToggles', JSON.stringify(updatedSettings.localDealsToggles));
      localStorage.setItem('devSettings_showExtraTransparentCards', JSON.stringify(updatedSettings.showExtraCards));
      localStorage.setItem('devSettings_transparentCard1FadedColor', JSON.stringify(updatedSettings.transparentCard1FadedColor));
      localStorage.setItem('devSettings_transparentCard2FadedColor', JSON.stringify(updatedSettings.transparentCard2FadedColor));
      localStorage.setItem('devSettings_transparentCard3FadedColor', JSON.stringify(updatedSettings.transparentCard3FadedColor));
      localStorage.setItem('devSettings_showBwTownVipPerksCard', JSON.stringify(updatedSettings.showBwTownVipPerksCard));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, [settings, getSettingsKey]);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    Cookies.remove(getSettingsKey('settings'));
    
    // Clear localStorage
    localStorage.removeItem('main11_buttonToggles');
    localStorage.removeItem('main11_localDealsToggles');
    localStorage.removeItem('devSettings_showExtraTransparentCards');
    localStorage.removeItem('devSettings_transparentCard1FadedColor');
    localStorage.removeItem('devSettings_transparentCard2FadedColor');
    localStorage.removeItem('devSettings_transparentCard3FadedColor');
    localStorage.removeItem('devSettings_showBwTownVipPerksCard');
  }, [getSettingsKey]);

  return {
    settings,
    saveSettings,
    resetSettings,
    updateButtonToggles: (toggles: any[]) => saveSettings({ buttonToggles: toggles }),
    updateLocalDealsToggles: (toggles: any[]) => saveSettings({ localDealsToggles: toggles }),
    updateShowExtraCards: (show: boolean) => saveSettings({ showExtraCards: show }),
    updateTransparentCardSettings: (card1: boolean, card2: boolean, card3: boolean) => 
      saveSettings({ 
        transparentCard1FadedColor: card1, 
        transparentCard2FadedColor: card2, 
        transparentCard3FadedColor: card3 
      }),
    updateShowBwTownVipPerksCard: (show: boolean) => saveSettings({ showBwTownVipPerksCard: show }),
    updateShowDiscoverDealsTitle: (show: boolean) => saveSettings({ showDiscoverDealsTitle: show }),
    updateShowBigNewsTitle: (show: boolean) => saveSettings({ showBigNewsTitle: show }),
    updateBigNewsTitle: (title: string) => saveSettings({ bigNewsTitle: title }),
    updateLastPage: (page: string) => saveSettings({ lastPage: page })
  };
};
