import React from 'react';
import { useTranslation } from 'react-i18next';
//import { Link } https://reacttraining.com/react-router
import 'bootstrap/dist/css/bootstrap.min.css';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
  };


  return (
    <div className="d-flex">
      <button onClick={() => changeLanguage('en')} className="btn btn-light px-3 me-2 shadow">English</button>
      <button onClick={() => changeLanguage('es')} className="btn btn-light px-3 shadow">Spanish</button>
    </div>
  );
};
  

export default LanguageSwitcher;
