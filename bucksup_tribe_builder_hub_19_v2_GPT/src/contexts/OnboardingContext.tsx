import React, { createContext, useContext, useState, useEffect } from 'react';

interface OnboardingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  referrerId?: string;
  referrerData?: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  clearData: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STORAGE_KEY = 'bucksup_onboarding_data';

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<OnboardingData>(() => {
    // Load from localStorage on initialization
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        };
      }
    }
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const clearData = () => {
    setData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, clearData }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
