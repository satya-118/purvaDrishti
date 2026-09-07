import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    dashboard: "Dashboard",
    liveMap: "Live Map",
    fieldReports: "Field Reports",
    alerts: "Disaster Alerts",
    activeAlerts: "ACTIVE ALERTS",
    districtsOnWatch: "DISTRICTS ON WATCH",
    welcome: "Welcome to PurvaDrishti"
  },
  hi: {
    dashboard: "डैशबोर्ड (Dashboard)",
    liveMap: "लाइव मैप (Live Map)",
    fieldReports: "फील्ड रिपोर्ट (Field Reports)",
    alerts: "आपदा अलर्ट (Disaster Alerts)",
    activeAlerts: "सक्रिय अलर्ट",
    districtsOnWatch: "निगरानी वाले जिले",
    welcome: "पूर्वा दृष्टि में आपका स्वागत है"
  },
  as: {
    dashboard: "ডেশবৰ্ড (Dashboard)",
    liveMap: "লাইভ মেপ (Live Map)",
    fieldReports: "ক্ষেত্ৰ প্ৰতিবেদন (Field Reports)",
    alerts: "বিপৰ্যয় সতৰ্কবাণী (Disaster Alerts)",
    activeAlerts: "সক্ৰিয় সতৰ্কবাণী",
    districtsOnWatch: "নিৰীক্ষণ জিলা",
    welcome: "পূৰ্ব দৃষ্টিলৈ স্বাগতম"
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  
  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

