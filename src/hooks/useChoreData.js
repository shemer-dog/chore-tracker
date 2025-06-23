import { useState } from 'react';
import { formatDateKey } from '../utils/dateHelpers';

export const useChoreData = () => {
    const [currentViewDate, setCurrentViewDate] = useState(new Date());
    const [children, setChildren] = useState([]);
    const [choreDataByDate, setChoreDataByDate] = useState({});
    const [recurringChores, setRecurringChores] = useState({});

    const getCurrentDateKey = () => {
        return formatDateKey(currentViewDate);
    };

    const getChoreDataForDate = (dateKey) => {
        if (!choreDataByDate[dateKey]) {
            const newChoreData = { ...choreDataByDate };
            newChoreData[dateKey] = {};

            children.forEach(childName => {
                if (!newChoreData[dateKey][childName]) {
                    newChoreData[dateKey][childName] = [];
                    propagateRecurringChores(childName, dateKey, newChoreData);
                }
            });

            setChoreDataByDate(newChoreData);
            return newChoreData[dateKey];
        }
        return choreDataByDate[dateKey];
    };

    const propagateRecurringChores = (childName, dateKey, choreData) => {
        if (recurringChores[childName] && choreData[dateKey] && choreData[dateKey][childName]) {
            recurringChores[childName].forEach(template => {
                const exists = choreData[dateKey][childName].some(chore =>
                    chore.templateId === template.templateId
                );

                if (!exists) {
                    choreData[dateKey][childName].push({
                        id: Date.now() + Math.random(),
                        text: template.text,
                        completed: false,
                        type: 'recurring',
                        templateId: template.templateId
                    });
                }
            });
        }
    };

    const changeDay = (direction) => {
        const newDate = new Date(currentViewDate);
        newDate.setDate(newDate.getDate() + direction);
        setCurrentViewDate(newDate);
    };

    const addChild = (name) => {
        if (name && !children.includes(name)) {
            setChildren(prev => [...prev, name]);

            setRecurringChores(prev => ({
                ...prev,
                [name]: []
            }));

            setChoreDataByDate(prev => {
                const newData = { ...prev };
                Object.keys(newData).forEach(dateKey => {
                    if (!newData[dateKey][name]) {
                        newData[dateKey][name] = [];
                    }
                });

                const currentDateKey = getCurrentDateKey();
                if (!newData[currentDateKey]) {
                    newData[currentDateKey] = {};
                }
                if (!newData[currentDateKey][name]) {
                    newData[currentDateKey][name] = [];
                }

                return newData;
            });
        }
    };

    const removeChild = (childName) => {
        setChildren(prev => prev.filter(name => name !== childName));

        setChoreDataByDate(prev => {
            const newData = { ...prev };
            Object.keys(newData).forEach(dateKey => {
                delete newData[dateKey][childName];
            });
            return newData;
        });

        setRecurringChores(prev => {
            const newData = { ...prev };
            delete newData[childName];
            return newData;
        });
    };

    const addDailyChore = (childName, choreText) => {
        if (choreText.trim()) {
            const templateId = Date.now();

            setRecurringChores(prev => ({
                ...prev,
                [childName]: [...(prev[childName] || []), {
                    templateId: templateId,
                    text: choreText
                }]
            }));

            const today = new Date();
            const currentDate = new Date(currentViewDate);
            const startDate = currentDate >= today ? currentDate : today;

            setChoreDataByDate(prev => {
                const newData = { ...prev };

                for (let i = 0; i < 30; i++) {
                    const targetDate = new Date(startDate);
                    targetDate.setDate(startDate.getDate() + i);
                    const dateKey = formatDateKey(targetDate);

                    if (!newData[dateKey]) {
                        newData[dateKey] = {};
                    }
                    if (!newData[dateKey][childName]) {
                        newData[dateKey][childName] = [];
                    }

                    const exists = newData[dateKey][childName].some(chore =>
                        chore.templateId === templateId
                    );

                    if (!exists) {
                        newData[dateKey][childName].push({
                            id: Date.now() + i + Math.random(),
                            text: choreText,
                            completed: false,
                            type: 'recurring',
                            templateId: templateId
                        });
                    }
                }

                return newData;
            });
        }
    };

    const addSingleTask = (childName, choreText) => {
        if (choreText.trim()) {
            const currentDateKey = getCurrentDateKey();

            setChoreDataByDate(prev => {
                const newData = { ...prev };
                if (!newData[currentDateKey]) {
                    newData[currentDateKey] = {};
                }
                if (!newData[currentDateKey][childName]) {
                    newData[currentDateKey][childName] = [];
                }

                newData[currentDateKey][childName].push({
                    id: Date.now(),
                    text: choreText,
                    completed: false,
                    type: 'single',
                    dateAdded: currentDateKey
                });

                return newData;
            });
        }
    };

    const toggleChore = (childName, choreId) => {
        const currentDateKey = getCurrentDateKey();

        setChoreDataByDate(prev => {
            const newData = { ...prev };
            if (newData[currentDateKey] && newData[currentDateKey][childName]) {
                const chore = newData[currentDateKey][childName].find(c => c.id === choreId);
                if (chore) {
                    chore.completed = !chore.completed;
                }
            }
            return newData;
        });
    };

    const deleteChore = (childName, choreId, onRecurringDelete) => {
        const currentDateKey = getCurrentDateKey();
        const currentDateData = choreDataByDate[currentDateKey];

        if (currentDateData && currentDateData[childName]) {
            const choreToDelete = currentDateData[childName].find(c => c.id === choreId);

            if (choreToDelete && choreToDelete.type === 'recurring') {
                onRecurringDelete(childName, choreToDelete.templateId);
            } else {
                setChoreDataByDate(prev => {
                    const newData = { ...prev };
                    newData[currentDateKey][childName] = newData[currentDateKey][childName].filter(c => c.id !== choreId);
                    return newData;
                });
            }
        }
    };

    const deleteRecurringChore = (childName, templateId) => {
        setRecurringChores(prev => ({
            ...prev,
            [childName]: prev[childName].filter(template => template.templateId !== templateId)
        }));

        const today = new Date();
        setChoreDataByDate(prev => {
            const newData = { ...prev };
            Object.keys(newData).forEach(dateKey => {
                const date = new Date(dateKey);
                if (date >= today && newData[dateKey][childName]) {
                    newData[dateKey][childName] = newData[dateKey][childName].filter(
                        chore => chore.templateId !== templateId
                    );
                }
            });
            return newData;
        });
    };

    const resetDay = () => {
        const currentDateKey = getCurrentDateKey();

        setChoreDataByDate(prev => {
            const newData = { ...prev };
            const currentDateData = newData[currentDateKey];

            children.forEach(childName => {
                if (currentDateData && currentDateData[childName]) {
                    currentDateData[childName].forEach(chore => {
                        if (chore.type === 'recurring') {
                            chore.completed = false;
                        }
                    });
                    currentDateData[childName] = currentDateData[childName].filter(chore =>
                        chore.type === 'recurring' || !chore.completed
                    );
                }
            });

            return newData;
        });
    };

    const clearAll = () => {
        setChildren([]);
        setChoreDataByDate({});
        setRecurringChores({});
    };

    const getProgressPercentage = (childName) => {
        const currentDateKey = getCurrentDateKey();
        const currentDateData = getChoreDataForDate(currentDateKey);
        const chores = currentDateData[childName] || [];

        if (chores.length === 0) return 0;
        const completed = chores.filter(c => c.completed).length;
        return Math.round((completed / chores.length) * 100);
    };

    return {
        // State
        currentViewDate,
        children,
        choreDataByDate,
        recurringChores,

        // Actions
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

        // Helpers
        getCurrentDateKey,
        getChoreDataForDate,
        getProgressPercentage
    };
};