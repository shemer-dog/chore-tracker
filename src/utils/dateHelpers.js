export const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
};

export const getDateDisplay = (date, isRTL, t) => {
    const weekday = t(`weekdays.long.${date.getDay()}`);
    const month = t(`months.long.${date.getMonth()}`);
    const day = date.getDate();
    const year = date.getFullYear();

    if (isRTL) {
        return `${weekday}, ${day} ב${month} ${year}`;
    } else {
        return `${weekday}, ${month} ${day}, ${year}`;
    }
};

export const getTodayIndicator = (currentViewDate, t) => {
    const today = new Date();
    const isToday = formatDateKey(currentViewDate) === formatDateKey(today);
    const isPast = currentViewDate < today;
    const isFuture = currentViewDate > today;

    if (isToday) {
        return { text: t('today'), color: "#90EE90" };
    } else if (isPast) {
        const daysDiff = Math.floor((today - currentViewDate) / (1000 * 60 * 60 * 24));
        return {
            text: daysDiff === 1 ? t('yesterday') : t('daysAgo', { count: daysDiff }),
            color: "#FFB6C1"
        };
    } else if (isFuture) {
        const daysDiff = Math.floor((currentViewDate - today) / (1000 * 60 * 60 * 24));
        return {
            text: daysDiff === 1 ? t('tomorrow') : t('inDays', { count: daysDiff }),
            color: "#87CEEB"
        };
    }
};