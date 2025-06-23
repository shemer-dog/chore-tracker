import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSelector = () => {
    const { currentLanguage, setCurrentLanguage, t, isRTL } = useLanguage();

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'he', name: 'Hebrew', nativeName: 'עברית' }
    ];

    return (
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <label className="text-sm font-medium text-white opacity-90">
                {t('language')}:
            </label>
            <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className={`px-3 py-1 bg-white bg-opacity-90 border border-white border-opacity-50 text-gray-800 rounded-md text-sm focus:outline-none focus:bg-white hover:bg-white transition-colors ${isRTL ? 'text-right' : 'text-left'
                    }`}
                dir={isRTL ? 'rtl' : 'ltr'}
            >
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code} className="text-gray-800 bg-white">
                        {lang.nativeName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;