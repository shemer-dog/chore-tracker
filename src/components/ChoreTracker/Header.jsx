import { useLanguage } from '../../contexts/LanguageContext';
import { getDateDisplay, getTodayIndicator } from '../../utils/dateHelpers';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

const Header = ({ currentViewDate, onChangeDay }) => {
    const { t, isRTL } = useLanguage();

    const dateDisplay = getDateDisplay(currentViewDate, isRTL, t);
    const todayIndicator = getTodayIndicator(currentViewDate, t);

    return (
        <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-8 text-center">
            <div className={`flex justify-between items-start mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h1 className="text-4xl font-bold flex-1">{t('title')}</h1>
                <LanguageSelector />
            </div>
            <div className={`flex items-center justify-center gap-5 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                    onClick={() => onChangeDay(isRTL ? 1 : -1)}
                    className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 text-white flex items-center justify-center text-xl hover:bg-white/40 hover:scale-110 transition-all font-bold"
                >
                    {isRTL ? '›' : '‹'}
                </button>
                <div>
                    <div className={`text-lg font-semibold min-w-52 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {dateDisplay}
                    </div>
                    <div className={`text-sm opacity-80 mt-1 ${isRTL ? 'text-right' : 'text-left'}`} style={{ color: todayIndicator.color }}>
                        {todayIndicator.text}
                    </div>
                </div>
                <button
                    onClick={() => onChangeDay(isRTL ? -1 : 1)}
                    className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 text-white flex items-center justify-center text-xl hover:bg-white/40 hover:scale-110 transition-all font-bold"
                >
                    {isRTL ? '‹' : '›'}
                </button>
            </div>
        </div>
    );
};

export default Header;