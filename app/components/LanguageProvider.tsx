import { createContext, useCallback, useContext, useState } from "react";
import i18n from "../../src/localization";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }): JSX.Element => {
  const [_, update] = useState({});

  //Fofce update is needed to re-render react dom
  const forceUpdate = useCallback(() => {
    update({});
  }, []);

  const setLang = (lang: string) => {
    i18n.locale = lang;
    forceUpdate();
  };

  const t = (str: string) => {
    return i18n.t(str);
  };

  return (
    <LanguageContext.Provider
      value={{ lang: i18n.locale, setLang, t, forceUpdate }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
