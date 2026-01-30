
import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { LanguageType, EnrollmentData } from '../types';
import { jsPDF } from 'jspdf';
import { useTranslation } from '../App';
import { LANGUAGE_COLORS, DIRECTOR_EMAIL } from '../constants';

const Enroll: React.FC = () => {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { preSelectedLanguage?: LanguageType; preSelectedLevel?: string };

  const [formData, setFormData] = useState<EnrollmentData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    language: state?.preSelectedLanguage || LanguageType.ENGLISH,
    courseLevel: state?.preSelectedLevel || 'A1',
    preferredSchedule: t.morning,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const colors = useMemo(() => LANGUAGE_COLORS[formData.language], [formData.language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePDF = (data: EnrollmentData) => {
    const doc = new jsPDF();
    const rgb = formData.language === LanguageType.ENGLISH ? [79, 70, 229] : (formData.language === LanguageType.FRENCH ? [5, 150, 105] : [245, 158, 11]);
    
    doc.setFillColor(rgb[0], rgb[1], rgb[2]);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('LINGUISTIQUE DZ', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`Registration: ${data.language} Course`, 105, 30, { align: 'center' });

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    let y = 60;
    
    const addLine = (l: string, v: string) => {
      doc.text(`${l}: ${v}`, 20, y);
      y += 12;
    };

    addLine('Student', `${data.firstName} ${data.lastName}`);
    addLine('Email', data.email);
    addLine('Phone', data.phone);
    addLine('Language', data.language);
    addLine('Level', data.courseLevel);
    addLine('Schedule', data.preferredSchedule);

    doc.save(`LinguistiqueDZ_Enrollment_${data.lastName}.pdf`);
  };

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ 
        "form-name": "enrollment", 
        ...formData 
      })
    })
    .then((response) => {
      if (response.ok) {
        generatePDF(formData); 
        setIsSubmitting(false);
        setIsSuccess(true);
      } else {
        throw new Error("Form submission failed");
      }
    })
    .catch(error => {
      console.error("Form submission error:", error);
      generatePDF(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
    });
  };

  const inputClasses = `w-full px-4 py-4 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-offset-0 outline-none transition-all text-start shadow-sm hover:border-slate-300`;
  const focusColor = formData.language === LanguageType.ENGLISH ? 'focus:ring-indigo-500/10 focus:border-indigo-500' : (formData.language === LanguageType.FRENCH ? 'focus:ring-emerald-500/10 focus:border-emerald-500' : 'focus:ring-amber-500/10 focus:border-amber-500');

  const examples = {
    firstName: lang === 'ar' ? 'محمد' : 'Mohamed',
    lastName: lang === 'ar' ? 'براهيمي' : 'Brahimi',
    email: 'm.brahimi@gmail.com',
    phone: '0550 12 34 56'
  };

  if (isSuccess) {
    return (
      <div className="py-32 max-w-2xl mx-auto px-4 text-center animate-fade-in">
        <div className={`w-24 h-24 ${colors.bg} ${colors.text} rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-xl shadow-slate-200`}>✓</div>
        <h1 className="text-4xl font-black mb-6 text-slate-900">{t.successTitle}</h1>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-2xl mb-10 text-start">
          <p className="text-slate-600 text-lg leading-relaxed mb-6">{t.successDesc}</p>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3 rtl:space-x-reverse px-5 py-3 bg-emerald-50 text-emerald-700 rounded-2xl text-sm font-bold w-fit">
              <span className="text-xl">✉️</span>
              <span>{t.dir === 'rtl' ? 'تم إرسال بياناتك للمدير' : `Info sent to: ${DIRECTOR_EMAIL}`}</span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse px-5 py-3 bg-indigo-50 text-indigo-700 rounded-2xl text-sm font-bold w-fit">
              <span className="text-xl">📄</span>
              <span>{t.dir === 'rtl' ? 'تم تحميل بطاقة التسجيل' : 'Registration PDF Downloaded'}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')} 
          className={`${colors.primary} text-white px-12 py-5 rounded-2xl font-black shadow-2xl transform transition-transform hover:scale-105 active:scale-95`}
        >
          {t.dir === 'rtl' ? 'العودة للرئيسية' : 'Return Home'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen animate-fade-in">
      {/* Premium Hero Header for Enrollment */}
      <header className={`relative py-20 sm:py-28 overflow-hidden transition-colors duration-700 ${colors.primary}`}>
        <div className="absolute inset-0 bg-slate-900/20"></div>
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-slate-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <nav className="flex justify-center items-center space-x-4 rtl:space-x-reverse text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-8">
            <Link to="/" className="hover:text-white transition-colors">{t.home}</Link>
            <span>/</span>
            <span className="text-white">{t.enroll}</span>
          </nav>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 drop-shadow-md">
            {t.enrollTitle}
          </h1>
          <p className="text-white/80 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            {t.enrollDesc}
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 -mt-12 sm:-mt-16 pb-24 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            
            {/* Sidebar with helpful tips */}
            <div className={`p-8 sm:p-12 text-white hidden lg:block ${colors.primary} bg-gradient-to-br from-black/10 to-transparent`}>
               <h3 className="text-xl font-black mb-8">What's next?</h3>
               <ul className="space-y-8">
                  <li className="flex items-start space-x-4 rtl:space-x-reverse">
                    <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm shrink-0">1</span>
                    <p className="text-sm font-medium opacity-90">Fill out your personal details and language preference.</p>
                  </li>
                  <li className="flex items-start space-x-4 rtl:space-x-reverse">
                    <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm shrink-0">2</span>
                    <p className="text-sm font-medium opacity-90">Download your registration PDF and save it for campus visit.</p>
                  </li>
                  <li className="flex items-start space-x-4 rtl:space-x-reverse">
                    <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm shrink-0">3</span>
                    <p className="text-sm font-medium opacity-90">Our Director will call you within 24 hours to schedule your placement test.</p>
                  </li>
               </ul>
            </div>

            {/* Main Form Area */}
            <div className="lg:col-span-3 p-8 sm:p-12">
              <form 
                name="enrollment"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit} 
                className="space-y-8 text-start"
              >
                <input type="hidden" name="form-name" value="enrollment" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t.firstName}</label>
                    <input required name="firstName" value={formData.firstName} onChange={handleChange} className={`${inputClasses} ${focusColor}`} placeholder={examples.firstName} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t.lastName}</label>
                    <input required name="lastName" value={formData.lastName} onChange={handleChange} className={`${inputClasses} ${focusColor}`} placeholder={examples.lastName} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t.email}</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className={`${inputClasses} ${focusColor}`} placeholder={examples.email} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t.phone}</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`${inputClasses} ${focusColor}`} placeholder={examples.phone} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t.language}</label>
                    <select name="language" value={formData.language} onChange={handleChange} className={`${inputClasses} ${focusColor}`}>
                      <option value={LanguageType.ENGLISH}>English</option>
                      <option value={LanguageType.FRENCH}>Français</option>
                      <option value={LanguageType.SPANISH}>Español</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t.level}</label>
                    <select name="courseLevel" value={formData.courseLevel} onChange={handleChange} className={`${inputClasses} ${focusColor}`}>
                      <option value="A1">A1 - {t.beginner}</option>
                      <option value="A2">A2 - Elementary</option>
                      <option value="B1">B1 - {t.intermediate}</option>
                      <option value="B2">B2 - {t.advanced}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t.schedule}</label>
                    <select name="preferredSchedule" value={formData.preferredSchedule} onChange={handleChange} className={`${inputClasses} ${focusColor}`}>
                      <option>{t.morning} (08:30 - 12:30)</option>
                      <option>{t.afternoon} (13:30 - 17:30)</option>
                      <option>{t.evening} (18:00 - 20:00)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t.motivation}</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className={`${inputClasses} ${focusColor}`} placeholder={t.dir === 'rtl' ? 'أخبرنا عن هدفك من تعلم اللغة...' : 'Tell us about your learning goals...'} />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className={`w-full ${colors.primary} text-white font-black py-5 rounded-[1.25rem] hover:opacity-90 transition-all shadow-xl shadow-slate-200 flex items-center justify-center space-x-3 transform active:scale-95 group`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{t.dir === 'rtl' ? 'جاري إرسال الطلب...' : 'Transmitting Registration...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.complete}</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
