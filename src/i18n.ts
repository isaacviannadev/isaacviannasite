import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  "en-US": {
    translation: {
      Welcome: "Welcome",
      greetings: "Hi, I'm {{name}}",
      heading:
        "Software engineer and frontend developer, passionate about creating memorable digital experiences",
      gitBtn: "My Github",
      english: "English",
      portuguese: "Portuguese",
      spanish: "Spanish",
      itsTimeMessage: "It's time to make your software",
      development: {
        title: "Development",
        description:
          "I can help you to create your software, from the idea to the final product.",
      },
      design: {
        title: "Design & UI/UX",
        description:
          "Combining creativity and usability to make a smart and functional design",
      },
      web: {
        title: "Web & Mobile App",
        description:
          "Anywhere and on any device, your solution within everyone's reach",
      },
      agile: {
        title: "Agile Management",
        description:
          "Agile management of your project, saving time and resources",
      },
      talkMessage: "Talk to me about your idea and let's make it real together",
      copyright: "© 2023 - All rights reserved",
      withLove: "Made with",
    },
  },
  es: {
    translation: {
      Welcome: "Bienvenido",
      greetings: "Hola, soy {{name}}",
      heading:
        "Ingeniero de software y desarrollador frontend, apasionado por crear experiencias digitales memorables",
      gitBtn: "Mi Github",
      english: "Inglés",
      portuguese: "Portugués",
      spanish: "Español",
      itsTimeMessage: "Es hora de hacer tu software",
      development: {
        title: "Desarrollo",
        description:
          "Puedo ayudarte a crear tu software, desde la idea hasta el producto final.",
      },
      design: {
        title: "Design & UI/UX",
        description:
          "Combinando creatividad y usabilidad para hacer un diseño inteligente y funcional",
      },
      web: {
        title: "Web & Mobile App",
        description:
          "En cualquier lugar y en cualquier dispositivo, tu solución al alcance de todos",
      },
      agile: {
        title: "Gestión Ágil",
        description: "Gestión ágil de tu proyecto, ahorrando tiempo y recursos",
      },
      talkMessage: "Háblame de tu idea y hagámosla realidad juntos",
      copyright: "© 2023 - Todos los derechos reservados",
      withLove: "Hecho con",
    },
  },
  "pt-BR": {
    translation: {
      Welcome: "Bem-vindo",
      greetings: "Olá, eu sou {{name}}",
      heading:
        "Engenheiro de software e desenvolvedor frontend, apaixonado por criar experiências digitais memoráveis",
      gitBtn: "Meu Github",
      english: "Inglês",
      portuguese: "Português",
      spanish: "Espanhol",
      itsTimeMessage: "É hora de fazer seu software",
      development: {
        title: "Desenvolvimento",
        description:
          "Posso ajudá-lo a criar seu software, desde a ideia até o produto final.",
      },
      design: {
        title: "Design & UI/UX",
        description:
          "Combinando criatividade e usabilidade para fazer um design inteligente e funcional",
      },
      web: {
        title: "Web & Mobile App ",
        description:
          "Em qualquer lugar e em qualquer dispositivo, sua solução ao alcance de todos",
      },
      agile: {
        title: "Gestão Ágil",
        description:
          "Gestão ágil do seu projeto, economizando tempo e recursos",
      },
      talkMessage: "Conte-me sobre sua ideia e vamos torná-la realidade juntos",
      copyright: "© 2023 - Todos os direitos reservados",
      withLove: "Feito com",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: ["es", "pt-BR", "en-US"],
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
