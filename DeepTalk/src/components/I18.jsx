import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Footer translations
      copyright: "Copyright ©",
      aboutUs: "About Us",
      contactUs: "Contact Us",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      followUs: "Follow us on",
      allRightsReserved: "All rights reserved",
      // Landing Page translations
      welcome: "Welcome to Deep Talk",
      welcomeMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      theiaImageAlt: "Theia Image",
      aboutTitle: "About Deep Talk",
      aboutMessage: "Deep Talk is your AI-powered conversation companion.",
      companionTitle: "Having a companion that wants to talk",
      companionMessage: "Deep Talk engages in meaningful conversations with you.",
      row1Explanation: "Engage in deep conversations on topics that matter to you.",
      row2Explanation: "Experience AI-driven dialogue like never before.",
      // Navigation translations
      products: "Products",
      pricing: "Pricing",
      login: "Login",
      signUp: "Sign Up",
    },
  },
  fr: {
    translation: {
      // Footer translations
      copyright: "Droit d'auteur ©",
      aboutUs: "À propos de nous",
      contactUs: "Contactez-nous",
      privacyPolicy: "Politique de confidentialité",
      termsOfService: "Conditions d'utilisation",
      followUs: "Suivez-nous sur",
      allRightsReserved: "Tous droits réservés",
      // Landing Page translations
      welcome: "Bienvenue à Deep Talk",
      welcomeMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      theiaImageAlt: "Image de Theia",
      aboutTitle: "À propos de Deep Talk",
      aboutMessage: "Deep Talk est votre compagnon de conversation alimenté par l'IA.",
      companionTitle: "Avoir un compagnon qui veut parler",
      companionMessage: "Deep Talk engage des conversations significatives avec vous.",
      row1Explanation: "Engagez des conversations profondes sur des sujets qui comptent pour vous.",
      row2Explanation: "Découvrez des dialogues alimentés par l'IA comme jamais auparavant.",
      // Navigation translations
      products: "Produits",
      pricing: "Tarification",
      login: "Connexion",
      signUp: "S'inscrire",
    },
  },
  es: {
    translation: {
      // Footer translations
      copyright: "Derechos de autor ©",
      aboutUs: "Sobre nosotros",
      contactUs: "Contáctenos",
      privacyPolicy: "Política de privacidad",
      termsOfService: "Términos de servicio",
      followUs: "Síguenos en",
      allRightsReserved: "Todos los derechos reservados",
      // Landing Page translations
      welcome: "Bienvenido a Deep Talk",
      welcomeMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      theiaImageAlt: "Imagen de Theia",
      aboutTitle: "Sobre Deep Talk",
      aboutMessage: "Deep Talk es tu compañero de conversación impulsado por IA.",
      companionTitle: "Tener un compañero que quiere hablar",
      companionMessage: "Deep Talk participa en conversaciones significativas contigo.",
      row1Explanation: "Participa en conversaciones profundas sobre temas que te importan.",
      row2Explanation: "Experimenta un diálogo impulsado por IA como nunca antes.",
      // Navigation translations
      products: "Productos",
      pricing: "Precios",
      login: "Iniciar sesión",
      signUp: "Registrarse",
    },
  },
  // Add more languages as needed
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
