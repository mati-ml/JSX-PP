import React from 'react';
import { useTranslation } from 'react-i18next';
//import { Link } https://reacttraining.com/react-router

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Spanish</button>
    </div>
  );
};

export default LanguageSwitcher;
