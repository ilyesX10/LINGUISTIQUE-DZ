
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../App';
import { Lang } from '../translations';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { lang, setLang, t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: t.home, path: '/' },
    { name: t.courses, path: '/courses' },
    { name: t.enroll, path: '/enroll' },
  ];

  return (
    <div className="min-h-screen flex flex-col" dir={t.dir}>
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20 items-center">
            {/* Logo - Reduced size for mobile */}
            <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2 rtl:space-x-reverse shrink-0">
              <div className="w-7 h-7 sm:w-10 sm:h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-xl shadow-lg shadow-emerald-600/20">L</div>
              <span className="text-sm sm:text-lg lg:text-xl font-black text-slate-800 tracking-tighter uppercase">{t.schoolName}</span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] lg:text-sm font-bold transition-all hover:text-emerald-600 ${
                    location.pathname === link.path ? 'text-emerald-600' : 'text-slate-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4 rtl:space-x-reverse">
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as Lang)}
                className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-2 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
              >
                <option value="ar">العربية</option>
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
              <Link 
                to="/enroll"
                className="bg-slate-900 text-white px-5 lg:px-6 py-2 rounded-xl font-black text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 transform active:scale-95"
              >
                {t.getStarted}
              </Link>
            </div>

            {/* Mobile Menu Button - Optimized spacing */}
            <div className="flex md:hidden items-center space-x-1.5 rtl:space-x-reverse">
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as Lang)}
                className="bg-slate-50 border border-slate-200 text-[10px] font-black rounded-lg px-1.5 py-1 outline-none"
              >
                <option value="ar">AR</option>
                <option value="fr">FR</option>
                <option value="en">EN</option>
              </select>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 text-slate-600 hover:text-emerald-600 focus:outline-none bg-slate-50 rounded-lg border border-slate-200"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 animate-slide-down">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-4 text-base font-black rounded-2xl ${
                    location.pathname === link.path ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-2">
                <Link 
                  to="/enroll"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-emerald-600 text-white px-6 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-emerald-500/20"
                >
                  {t.getStarted}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-start">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-white font-bold text-lg">L</div>
                <span className="text-xl font-bold text-white tracking-tight">{t.schoolName}</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md text-sm leading-relaxed">
                {t.heroSub}
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6">{t.contactUs}</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <span className="text-emerald-400 mt-0.5">📍</span>
                  <span>{t.address}</span>
                </li>
                <li className="flex items-center space-x-3 rtl:space-x-reverse">
                  <span className="text-emerald-400">📞</span>
                  <span dir="ltr">+213 (0) 23 45 67 89</span>
                </li>
                <li className="flex items-center space-x-3 rtl:space-x-reverse">
                  <span className="text-emerald-400">✉️</span>
                  <span className="break-all">contact@linguistique-dz.edu</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6">Navigation</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">{t.home}</Link></li>
                <li><Link to="/courses" className="hover:text-emerald-400 transition-colors">{t.courses}</Link></li>
                <li><Link to="/enroll" className="hover:text-emerald-400 transition-colors">{t.enroll}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs font-bold text-slate-600 uppercase tracking-widest">
            © {new Date().getFullYear()} {t.schoolName} • Algiers Campus
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
