import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useChoreData } from '../../hooks/useChoreData';
import Header from './Header';
import ChildCard from './ChildCard';
import EmptyState from '../Layout/EmptyState';

const ChoreTracker = () => {
    const { t, isRTL } = useLanguage();
    const [childNameInput, setChildNameInput] = useState('');

    const {
        currentViewDate,
        children,
        changeDay,
        addChild,
        removeChild,
        addDailyChore,
        addSingleTask,
        toggleChore,
        deleteChore,
        deleteRecurringChore,
        resetDay,
        clearAll,
        getChoreDataForDate,
        getProgressPercentage,
        getCurrentDateKey
    } = useChoreData();

    const handleAddChild = () => {
        const name = childNameInput.trim();
        if (name) {
            addChild(name);
            setChildNameInput('');
        }
    };

    const handleRemoveChild = (childName) => {
        if (confirm(t('removeChildConfirm', { name: childName }))) {
            removeChild(childName);
        }
    };

    const handleDeleteChore = (childName, choreId) => {
        deleteChore(childName, choreId, (childName, templateId) => {
            if (confirm(t('deleteRecurringConfirm'))) {
                deleteRecurringChore(childName, templateId);
            }
        });
    };

    const handleResetDay = () => {
        if (confirm(t('resetDayConfirm'))) {
            resetDay();
        }
    };

    const handleClearAll = () => {
        if (confirm(t('clearAllConfirm'))) {
            clearAll();
        }
    };

    const currentDateKey = getCurrentDateKey();
    const currentDateData = getChoreDataForDate(currentDateKey);
    const isPastDate = currentViewDate < new Date().setHours(0, 0, 0, 0);

    return (
        <div className={`min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-700 p-5 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <Header
                    currentViewDate={currentViewDate}
                    onChangeDay={changeDay}
                />

                {/* Main Content */}
                <div className="p-8">
                    {/* Controls */}
                    <div className={`flex gap-4 mb-8 flex-wrap justify-start`}>
                        <div className={`flex gap-2 items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <input
                                type="text"
                                value={childNameInput}
                                onChange={(e) => setChildNameInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddChild()}
                                placeholder={t('enterChildName')}
                                className={`p-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-400 transition-colors ${isRTL ? 'text-right' : 'text-left'
                                    }`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            />
                            <button
                                onClick={handleAddChild}
                                className="px-5 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-base font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-lg transition-all"
                            >
                                {t('addChild')}
                            </button>
                        </div>
                        <button
                            onClick={handleResetDay}
                            className="px-5 py-3 bg-gray-100 text-gray-600 border-2 border-gray-200 text-base font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            {t('resetDay')}
                        </button>
                        <button
                            onClick={handleClearAll}
                            className="px-5 py-3 bg-gray-100 text-gray-600 border-2 border-gray-200 text-base font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            {t('clearAll')}
                        </button>
                    </div>

                    {/* Children Grid or Empty State */}
                    {children.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {children.map(childName => (
                                <ChildCard
                                    key={childName}
                                    childName={childName}
                                    chores={currentDateData[childName] || []}
                                    progress={getProgressPercentage(childName)}
                                    isPastDate={isPastDate}
                                    onToggleChore={toggleChore}
                                    onDeleteChore={handleDeleteChore}
                                    onRemoveChild={handleRemoveChild}
                                    onAddDaily={addDailyChore}
                                    onAddSingle={addSingleTask}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChoreTracker;