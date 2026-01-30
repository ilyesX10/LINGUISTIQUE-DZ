
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Enroll from './pages/Enroll';
import { Lang, translations } from './translations';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: any;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(LangContext);
  if (!context) throw new Error('useTranslation must be used within LangProvider');
  return context;
};

// Global scroll reset for SPA navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>('fr');

  useEffect(() => {
    document.documentElement.dir = translations[lang].dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang]
  };

  return (
    <LangContext.Provider value={value}>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/enroll" element={<Enroll />} />
          </Routes>
        </Layout>
      </Router>
    </LangContext.Provider>
  );
};

export default App;
