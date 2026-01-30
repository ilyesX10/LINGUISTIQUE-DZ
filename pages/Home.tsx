
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../App';
import { ALGERIAN_SCHEDULE, LANGUAGE_COLORS } from '../constants';
import { LanguageType } from '../types';

const Home: React.FC = () => {
  const { t, lang } = useTranslation();
  const [activeTab, setActiveTab] = useState<'sun' | 'mon' | 'tue' | 'wed' | 'thu'>('sun');

  const getLangFromSession = (session: string): LanguageType | null => {
    if (session.toLowerCase().includes('english')) return LanguageType.ENGLISH;
    if (session.toLowerCase().includes('french')) return LanguageType.FRENCH;
    if (session.toLowerCase().includes('spanish')) return LanguageType.SPANISH;
    return null;
  };

  const SessionCard = ({ session, time }: { session: string, time: string }) => {
    const lType = getLangFromSession(session);
    if (!session || session === '-') return null;

    const colors = lType ? LANGUAGE_COLORS[lType] : { primary: 'bg-slate-400', text: 'text-slate-600', bg: 'bg-slate-50' };
    const level = session.split(' ').pop();
    const title = session.replace(` ${level}`, '');

    return (
      <div className="relative group perspective-1000">
        <div className={`absolute -inset-0.5 ${colors.primary} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`}></div>
        <div className="relative bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter text-white ${colors.primary}`}>
              {lType}
            </span>
            <span className="text-[10px] font-bold text-slate-400 font-mono">{time.split(' - ')[0]}</span>
          </div>
          <h4 className="text-lg font-bold text-slate-900 mb-1">{title}</h4>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className={`w-2 h-2 rounded-full ${colors.primary} animate-pulse`}></div>
              <span className="text-xs font-bold text-slate-500 uppercase">{t.dir === 'rtl' ? 'المستوى' : 'Level'} {level}</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
          </div>
        </div>
      </div>
    );
  };

  const days = [
    { key: 'sun', label: t.dir === 'rtl' ? 'الأحد' : 'Sunday' },
    { key: 'mon', label: t.dir === 'rtl' ? 'الاثنين' : 'Monday' },
    { key: 'tue', label: t.dir === 'rtl' ? 'الثلاثاء' : 'Tuesday' },
    { key: 'wed', label: t.dir === 'rtl' ? 'الأربعاء' : 'Wednesday' },
    { key: 'thu', label: t.dir === 'rtl' ? 'الخميس' : 'Thursday' }
  ] as const;

  return (
    <div className="animate-fade-in bg-white">
      {/* Hero Section - Added pt-20 to clear fixed header and sm:pt-0 to center on desktop */}
      <section className="relative min-h-[650px] sm:h-[80vh] flex flex-col sm:flex-row items-center justify-center overflow-hidden bg-slate-900 pt-24 sm:pt-0">
        <img 
          src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop" 
          alt="Linguistic Academy Students" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Badge - Increased top margin and cleared safe area */}
          <span className="inline-block px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6 sm:mb-8 border border-emerald-500/30">
            {t.dir === 'rtl' ? 'مرحبًا بكم في أكاديميتنا' : 'Welcome to Excellence'}
          </span>
          <h1 className="text-3xl sm:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 leading-[1.1] sm:leading-[1.05] tracking-tight drop-shadow-sm">
            {t.tagline}
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl text-slate-300 mb-10 sm:mb-12 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center px-6 sm:px-0">
            <Link to="/courses" className="bg-emerald-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black hover:bg-emerald-500 transition-all text-base sm:text-lg shadow-2xl shadow-emerald-500/20 transform hover:scale-105 active:scale-95">
              {t.courses}
            </Link>
            <Link to="/enroll" className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black hover:bg-white/20 transition-all text-base sm:text-lg transform hover:scale-105 active:scale-95">
              {t.enroll}
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Features Grid */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-16">
            {[
              { title: t.feature1, desc: t.feature1Desc, icon: "🎯" },
              { title: t.feature2, desc: t.feature2Desc, icon: "💎" },
              { title: t.feature3, desc: t.feature3Desc, icon: "🏛️" }
            ].map((feature, idx) => (
              <div key={idx} className="relative group text-center sm:text-start">
                <div className="text-4xl sm:text-5xl mb-6 sm:mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 inline-block">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 text-base sm:text-lg leading-relaxed">{feature.desc}</p>
                <div className="mt-6 sm:mt-8 h-1 w-12 bg-slate-100 rounded-full group-hover:w-full group-hover:bg-emerald-500 transition-all duration-700 mx-auto sm:mx-0"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Board Schedule */}
      <section className="py-20 sm:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-3 block">{t.dir === 'rtl' ? 'الجدول الزمني' : 'Course Board'}</span>
              <h2 className="text-3xl sm:text-6xl font-black text-slate-900 leading-tight">{t.scheduleTitle}</h2>
            </div>
            
            {/* Day Filter */}
            <div className="w-full md:w-auto">
              <div className="md:hidden relative group">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as any)}
                  className="w-full bg-white border-2 border-slate-200 text-slate-900 font-black text-base rounded-2xl pl-6 pr-12 py-4 shadow-lg shadow-slate-200/50 outline-none appearance-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2310b981'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, 
                    backgroundRepeat: 'no-repeat', 
                    backgroundPosition: t.dir === 'rtl' ? 'left 1.25rem center' : 'right 1.25rem center', 
                    backgroundSize: '1.2em' 
                  }}
                >
                  {days.map(day => (
                    <option key={day.key} value={day.key}>{day.label}</option>
                  ))}
                </select>
              </div>

              <div className="hidden md:flex p-1.5 bg-white rounded-2xl shadow-sm border border-slate-200">
                {days.map(day => (
                  <button
                    key={day.key}
                    onClick={() => setActiveTab(day.key as any)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                      activeTab === day.key ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {ALGERIAN_SCHEDULE.map((slot, idx) => {
              const session = (slot as any)[activeTab];
              
              return (
                <div key={idx} className="relative">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4 sm:mb-6">
                    <span className="text-[10px] font-black font-mono text-slate-300 bg-slate-200/50 px-2 py-1 rounded">SLOT 0{idx+1}</span>
                    <div className="h-px flex-grow bg-slate-200"></div>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-900">{slot.time}</span>
                  </div>
                  {session && session !== '-' ? (
                    <SessionCard session={session} time={slot.time} />
                  ) : (
                    <div className="h-32 sm:h-40 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center opacity-40 group hover:opacity-100 transition-opacity">
                      <span className="text-xl sm:text-2xl mb-2 grayscale group-hover:grayscale-0 transition-all">☕</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.dir === 'rtl' ? 'استراحة' : 'Break'}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-16 p-6 sm:p-10 bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-4 sm:space-x-6 rtl:space-x-reverse text-center sm:text-start">
              <div className="hidden sm:flex w-16 h-16 bg-white/10 rounded-2xl items-center justify-center text-3xl">📅</div>
              <div>
                <p className="text-xs sm:text-sm text-slate-400 font-bold mb-1 uppercase tracking-widest">{t.dir === 'rtl' ? 'هل أنت مستعد؟' : 'Ready to join?'}</p>
                <p className="text-base sm:text-xl font-bold">{t.dir === 'rtl' ? 'جميع الحصص حضورية في معهدنا' : 'All classes are in-person at Hydra Campus'}</p>
              </div>
            </div>
            <Link to="/enroll" className="w-full sm:w-auto text-center bg-emerald-500 text-slate-900 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-black hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/10">
              {t.enroll}
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-10 sm:p-20 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">{t.locationTitle}</h2>
              <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed">{t.locationDesc}</p>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-4 sm:space-x-6 rtl:space-x-reverse">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">📍</div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1 uppercase tracking-widest text-[10px]">Campus Address</h4>
                    <p className="text-slate-600 text-base sm:text-lg">{t.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-[350px] lg:h-auto min-h-[450px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.873204918451!2d3.0331663152504997!3d36.75133397995874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb2084c8a514d%3A0x6b2e1f5e8a7d1a2!2sHydra%2C%20Algiers!5e0!3m2!1sen!2sdz!4v1709123456789!5m2!1sen!2sdz" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy"
                title="Hydra Campus Location"
                className="grayscale opacity-90"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
