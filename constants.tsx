
import { LanguageType, CoursePlan } from './types';

export const DIRECTOR_EMAIL = 'ilyesdrouiche00@gmail.com';

export const LANGUAGE_COLORS: Record<LanguageType, { primary: string, bg: string, text: string, border: string, shadow: string }> = {
  [LanguageType.ENGLISH]: {
    primary: 'bg-indigo-600',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-100',
    shadow: 'shadow-indigo-100'
  },
  [LanguageType.FRENCH]: {
    primary: 'bg-emerald-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-100',
    shadow: 'shadow-emerald-100'
  },
  [LanguageType.SPANISH]: {
    primary: 'bg-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-100',
    shadow: 'shadow-amber-100'
  }
};

export const COURSE_PLANS: CoursePlan[] = [
  // French Courses
  {
    id: 'fr-a1',
    language: LanguageType.FRENCH,
    level: 'A1 - Débutant',
    duration: '10 Weeks',
    price: '22,000 DA',
    description: 'Establish the basics of French communication and grammar.',
    topics: ['Prononciation', 'Salutations', 'Grammaire de base', 'Vocabulaire quotidien'],
  },
  {
    id: 'fr-a2',
    language: LanguageType.FRENCH,
    level: 'A2 - Élémentaire',
    duration: '10 Weeks',
    price: '24,000 DA',
    description: 'Deepen your knowledge and start handling simple everyday tasks.',
    topics: ['Passé composé', 'Description', 'Achats', 'Vie sociale'],
  },
  {
    id: 'fr-b1',
    language: LanguageType.FRENCH,
    level: 'B1 - Intermédiaire',
    duration: '12 Weeks',
    price: '28,000 DA',
    description: 'Become independent in most situations encountered while traveling or working.',
    topics: ['Subjonctif', 'Débats', 'Narration', 'Rédaction'],
  },
  {
    id: 'fr-b2',
    language: LanguageType.FRENCH,
    level: 'B2 - Avancé',
    duration: '12 Weeks',
    price: '32,000 DA',
    description: 'Communicate with a degree of spontaneity and ease with native speakers.',
    topics: ['Argumentation', 'Actualités', 'Nuances', 'Synthèse'],
  },
  // English Courses
  {
    id: 'en-a1',
    language: LanguageType.ENGLISH,
    level: 'A1 - Beginner',
    duration: '10 Weeks',
    price: '22,000 DA',
    description: 'Introduction to basic English structure and vocabulary.',
    topics: ['Greetings', 'Present Simple', 'Numbers', 'Basic Verbs'],
  },
  {
    id: 'en-a2',
    language: LanguageType.ENGLISH,
    level: 'A2 - Elementary',
    duration: '10 Weeks',
    price: '24,000 DA',
    description: 'Improve communication for routine tasks and personal information.',
    topics: ['Past Simple', 'Comparatives', 'Workplace English', 'Shopping'],
  },
  {
    id: 'en-b1',
    language: LanguageType.ENGLISH,
    level: 'B1 - Intermediate',
    duration: '12 Weeks',
    price: '28,000 DA',
    description: 'Understand the main points of clear standard input on familiar matters.',
    topics: ['Perfect Tenses', 'Relative Clauses', 'Business Basics', 'Travel'],
  },
  {
    id: 'en-b2',
    language: LanguageType.ENGLISH,
    level: 'B2 - Upper Intermediate',
    duration: '12 Weeks',
    price: '32,000 DA',
    description: 'Interact with fluency and prepare for academic or professional settings.',
    topics: ['Phrasal Verbs', 'Essays', 'Complex Grammar', 'Professional Skills'],
  },
  // Spanish Courses
  {
    id: 'es-a1',
    language: LanguageType.SPANISH,
    level: 'A1 - Principiante',
    duration: '10 Weeks',
    price: '20,000 DA',
    description: 'Start your Spanish journey with fundamental greetings and present tense.',
    topics: ['Saludos', 'Presente', 'La Familia', 'Cultura'],
  },
  {
    id: 'es-a2',
    language: LanguageType.SPANISH,
    level: 'A2 - Básico',
    duration: '10 Weeks',
    price: '22,000 DA',
    description: 'Build confidence in basic expressions and social interactions.',
    topics: ['Indefinido', 'Imperativo', 'Viajes', 'Restaurantes'],
  },
  {
    id: 'es-b1',
    language: LanguageType.SPANISH,
    level: 'B1 - Intermedio',
    duration: '12 Weeks',
    price: '26,000 DA',
    description: 'Handle most travel situations and express thoughts on general topics.',
    topics: ['Subjuntivo', 'Futuro', 'Opiniones', 'Tradiciones'],
  },
  {
    id: 'es-b2',
    language: LanguageType.SPANISH,
    level: 'B2 - Avanzado',
    duration: '12 Weeks',
    price: '30,000 DA',
    description: 'Understand complex ideas and communicate fluently on various subjects.',
    topics: ['Condicional', 'Redacción Pro', 'Literatura', 'Debates'],
  },
];

export const ALGERIAN_SCHEDULE = [
  { time: '08:30 - 10:30', sun: 'English A1', mon: 'French A2', tue: 'English A1', wed: 'French A2', thu: 'Spanish A1' },
  { time: '11:00 - 13:00', sun: 'French A1', mon: 'English B1', tue: 'French A1', wed: 'English B1', thu: 'Spanish A2' },
  { time: '14:00 - 16:00', sun: 'Spanish B1', mon: 'English A2', tue: 'Spanish B1', wed: 'English A2', thu: 'French B1' },
  { time: '17:00 - 19:00', sun: 'English B2', mon: 'French B2', tue: 'English B2', wed: 'French B2', thu: 'Spanish B2' },
];
