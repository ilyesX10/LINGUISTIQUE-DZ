
import React, { useState } from 'react';
import { COURSE_PLANS, LANGUAGE_COLORS } from '../constants';
import { LanguageType } from '../types';
import { Link } from 'react-router-dom';
import { useTranslation } from '../App';

const Courses: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<LanguageType | 'All'>('All');

  const filteredPlans = filter === 'All' 
    ? COURSE_PLANS 
    : COURSE_PLANS.filter(p => p.language === filter);

  return (
    <div className="py-16 sm:py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">{t.coursePlans}</h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">{t.courseSub}</p>
        </div>

        {/* Responsive Horizontal Scroll for Filters */}
        <div className="flex justify-start sm:justify-center mb-12 sm:mb-16 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex p-1 bg-white rounded-2xl shadow-sm border border-slate-200 min-w-max">
            {['All', LanguageType.ENGLISH, LanguageType.FRENCH, LanguageType.SPANISH].map((lang) => {
              const isActive = filter === lang;
              const colorSet = lang !== 'All' ? LANGUAGE_COLORS[lang as LanguageType] : null;
              
              return (
                <button
                  key={lang}
                  onClick={() => setFilter(lang as any)}
                  className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive 
                      ? (colorSet ? `${colorSet.primary} text-white shadow-lg ${colorSet.shadow}` : 'bg-emerald-600 text-white shadow-lg shadow-emerald-200')
                      : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {lang === 'All' ? t.all : lang}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPlans.map((plan) => {
            const colors = LANGUAGE_COLORS[plan.language];
            
            return (
              <div key={plan.id} className={`bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group`}>
                
                {/* Block 1: Header (Title & Language) */}
                <div className={`p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center group-hover:${colors.bg} transition-colors`}>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{plan.level}</h3>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${colors.primary} text-white shadow-sm`}>
                    {plan.language}
                  </span>
                </div>

                {/* Block 2: Price Section */}
                <div className="px-6 sm:px-8 py-4 sm:py-6 border-b border-slate-100 flex items-center justify-between bg-white">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{t.dir === 'rtl' ? 'السعر' : 'Investment'}</span>
                  <span className={`text-xl sm:text-2xl font-black ${colors.text}`}>{plan.price}</span>
                </div>

                {/* Block 3: Description Paragraph */}
                <div className="p-6 sm:p-8 flex-grow bg-white">
                  <p className="text-slate-600 leading-relaxed text-sm italic">
                    "{plan.description}"
                  </p>
                </div>

                {/* Block 4: Topics / Curriculum */}
                <div className="px-6 sm:px-8 py-4 sm:py-6 bg-slate-50/50 border-t border-b border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    {t.dir === 'rtl' ? 'المحتوى الدراسي' : 'Curriculum Focus'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {plan.topics.map((topic, i) => (
                      <div key={i} className="flex items-center text-[11px] sm:text-xs font-medium text-slate-700 rtl:flex-row-reverse">
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.primary} mx-2 shrink-0 opacity-60`}></span>
                        <span className="truncate">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Block 5: Duration & Action */}
                <div className="p-5 sm:p-6 bg-white flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">{t.dir === 'rtl' ? 'المدة' : 'Duration'}</span>
                     <span className="text-xs sm:text-sm font-bold text-slate-800">{plan.duration}</span>
                  </div>
                  <Link 
                    to="/enroll" 
                    state={{ preSelectedLanguage: plan.language, preSelectedLevel: plan.level }}
                    className={`bg-slate-900 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:${colors.primary} transition-all shadow-md active:scale-95`}
                  >
                    {t.enroll}
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Courses;
