import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const ChoreInput = ({ childName, onAddDaily, onAddSingle }) => {
    const { t, isRTL } = useLanguage();
    const [inputValue, setInputValue] = useState('');

    const handleAddDaily = () => {
        onAddDaily(childName, inputValue);
        setInputValue('');
    };

    const handleAddSingle = () => {
        onAddSingle(childName, inputValue);
        setInputValue('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddSingle();
        }
    };

    return (
        <div className="mb-4">
            <div className={`flex gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('addChoreTask')}
                    className={`flex-1 p-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-400 transition-colors ${isRTL ? 'text-right' : 'text-left'
                        }`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                />
            </div>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                    onClick={handleAddDaily}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-sm font-semibold rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                    {t('addDailyChore')}
                </button>
                <button
                    onClick={handleAddSingle}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-semibold rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                    {t('addSingleTask')}
                </button>
            </div>
        </div>
    );
};

export default ChoreInput;