{/* Controls */ }
<div className="flex gap-4 mb-8 flex-wrap justify-start">
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