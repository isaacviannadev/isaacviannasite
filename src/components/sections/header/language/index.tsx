import { t } from "i18next";
import { useEffect, useState } from "react";
import { en, es, pt } from "../../../../assets/flags";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { LangButton, MenuLang, PopoverLang } from "./styled";

const LanguageSelector = () => {
  const { language: defaultLang, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    {
      name: "English",
      flag: en,
      code: "en-US",
    },
    {
      name: "Português",
      flag: pt,
      code: "pt-BR",
    },
    {
      name: "Español",
      flag: es,
      code: "es",
    },
  ];

  const labels = {
    "en-US": "english",
    "pt-BR": "portuguese",
    es: "spanish",
  };

  const getLanguage = (code: string) => {
    const foundLang = languages.find((lang) => lang.code === code);
    return foundLang || languages[1]; // Retorna português como padrão
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".language-selector")) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleLanguageChange = (code: string) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <MenuLang className="language-selector">
      <LangButton onClick={() => setIsOpen(!isOpen)}>
        <img
          src={getLanguage(defaultLang).flag}
          alt={getLanguage(defaultLang).name}
          width={24}
          height={24}
        />
      </LangButton>
      {isOpen && (
        <PopoverLang>
          {languages.map((language) => {
            if (language.code !== defaultLang) {
              return (
                <LangButton
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  <img
                    src={language.flag}
                    alt={language.name}
                    width={24}
                    height={24}
                  />
                  <span>{t(labels[language.code as keyof typeof labels])}</span>
                </LangButton>
              );
            }
            return null;
          })}
        </PopoverLang>
      )}
    </MenuLang>
  );
};

export default LanguageSelector;
