import { createContext, useContext, useState } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    const t = (key, params = {}) => {
        const keys = key.split('.');
        let value = translations[currentLanguage];

        for (const k of keys) {
            value = value?.[k];
        }

        if (!value) {
            // Fallback to English
            value = translations.en;
            for (const k of keys) {
                value = value?.[k];
            }
        }

        if (!value) return key;

        // Replace parameters
        return Object.keys(params).reduce((str, param) => {
            return str.replace(`{${param}}`, params[param]);
        }, value);
    };

    const isRTL = currentLanguage === 'he';

    return (
        <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};