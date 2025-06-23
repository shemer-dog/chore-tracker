import { useLanguage } from '../../contexts/LanguageContext';
import ChoreInput from './ChoreInput';

const ChildCard = ({
    childName,
    chores,
    progress,
    isPastDate,
    onToggleChore,
    onDeleteChore,
    onRemoveChild,
    onAddDaily,
    onAddSingle
}) => {
    const { t, isRTL } = useLanguage();

    const recurringChores = chores.filter(c => c.type === 'recurring');
    const singleChores = chores.filter(c => c.type === 'single');
    const completedRecurring = recurringChores.filter(c => c.completed).length;
    const completedSingle = singleChores.filter(c => c.completed).length;

    return (
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-blue-400 hover:-translate-y-1 hover:shadow-lg transition-all">
            <div className={`flex justify-between items-center mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`text-xl font-bold text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {childName}
                </div>
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-gray-800 relative"
                    style={{
                        background: `conic-gradient(#4facfe ${progress * 3.6}deg, #e9ecef 0)`
                    }}
                >
                    <div className="absolute w-8 h-8 bg-white rounded-full"></div>
                    <div className="relative z-10 text-xs">{progress}%</div>
                </div>
            </div>

            <div className={`flex justify-between mb-4 p-2 bg-gray-50 rounded-lg text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex flex-col items-center gap-1">
                    <div className="font-bold text-base">{completedRecurring}/{recurringChores.length}</div>
                    <div className="text-gray-500 text-xs">{t('daily')}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="font-bold text-base">{completedSingle}/{singleChores.length}</div>
                    <div className="text-gray-500 text-xs">{t('tasks')}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="font-bold text-base">{chores.filter(c => c.completed).length}/{chores.length}</div>
                    <div className="text-gray-500 text-xs">{t('total')}</div>
                </div>
            </div>

            {!isPastDate && (
                <ChoreInput
                    childName={childName}
                    onAddDaily={onAddDaily}
                    onAddSingle={onAddSingle}
                />
            )}

            <ul className="space-y-0">
                {chores.length === 0 ? (
                    <li className={`py-3 text-gray-400 italic ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t('noChoresForDay')}
                    </li>
                ) : (
                    chores.map(chore => (
                        <li key={chore.id} className={`flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className={`flex items-center gap-3 flex-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div
                                    onClick={() => onToggleChore(childName, chore.id)}
                                    className={`w-5 h-5 border-2 rounded cursor-pointer transition-all relative ${chore.completed
                                            ? 'bg-gradient-to-r from-blue-400 to-cyan-400 border-blue-400'
                                            : 'border-gray-300 hover:border-blue-400'
                                        }`}
                                >
                                    {chore.completed && (
                                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">✓</div>
                                    )}
                                </div>
                                <span className={`text-base text-gray-800 transition-all flex-1 ${chore.completed ? 'line-through opacity-60' : ''} ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {chore.text}
                                </span>
                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${isRTL ? 'mr-2' : 'ml-2'} ${chore.type === 'single'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {chore.type === 'single' ? t('task') : t('daily')}
                                </span>
                            </div>
                            {!isPastDate && (
                                <button
                                    onClick={() => onDeleteChore(childName, chore.id)}
                                    className="text-red-500 hover:bg-red-500 hover:text-white p-1 rounded transition-all"
                                >
                                    ×
                                </button>
                            )}
                        </li>
                    ))
                )}
            </ul>

            {!isPastDate && (
                <div className={`mt-4 ${isRTL ? 'text-left' : 'text-right'}`}>
                    <button
                        onClick={() => onRemoveChild(childName)}
                        className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        {t('removeChild', { name: childName })}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChildCard;