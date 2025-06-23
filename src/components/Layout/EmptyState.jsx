import { useLanguage } from '../../contexts/LanguageContext';

const EmptyState = () => {
    const { t, isRTL } = useLanguage();

    return (
        <div className={`text-center py-16 text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-2xl mb-2 text-gray-600">{t('noChildrenTitle')}</h3>
            <p>{t('noChildrenSubtitle')}</p>
        </div>
    );
};

export default EmptyState;