import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const languages = [
        { code: 'en', label: t('languages.english') },
        { code: 'ru', label: t('languages.russian') },
        { code: 'pre', label: t('languages.prerevolutionary') },
    ];

    const handleLanguageChange = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
    };

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
            <div className="flex items-center">
                {languages.map((lang, index) => (
                    <div key={lang.code} className="flex items-center">
                        <button
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`text-sm font-medium transition-all duration-200 px-1 py-1 hover:underline underline-offset-4 decoration-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-zinc-900 min-h-[36px] flex items-center rounded-sm ${i18n.language === lang.code
                                ? 'text-white/90'
                                : 'text-white/50 hover:text-white/70'
                                }`}
                            aria-label={`Switch to ${lang.label}`}
                        >
                            {lang.label}
                        </button>
                        {index < languages.length - 1 && (
                            <span className="text-white/30 select-none px-1">•</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;