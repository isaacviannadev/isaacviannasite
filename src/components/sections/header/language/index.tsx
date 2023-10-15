import { en, es, pt } from "../../../../assets/flags";
import { LangButton, MenuLang, PopoverLang } from "./styled";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { t, use } from "i18next";

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

    if (foundLang) {
      return foundLang;
    }

    return languages[0];
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!e.target.closest(".language-selector")) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <MenuLang className="language-selector">
      <LangButton onClick={() => setIsOpen(!isOpen)}>
        <img
          src={getLanguage(defaultLang).flag}
          alt={getLanguage(defaultLang).name}
        />
      </LangButton>
      {isOpen && (
        <PopoverLang>
          {languages.map((language, index) => {
            if (language.code !== defaultLang) {
              return (
                <LangButton
                  key={index}
                  onClick={() => changeLanguage(language.code)}
                >
                  <img src={language.flag} alt={language.name} />
                  <span>{t(labels[language.code as keyof typeof labels])}</span>
                </LangButton>
              );
            }
          })}
        </PopoverLang>
      )}
    </MenuLang>
  );
};

export default LanguageSelector;
