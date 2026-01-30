
export enum LanguageType {
  FRENCH = 'French',
  ENGLISH = 'English',
  SPANISH = 'Spanish'
}

export interface CoursePlan {
  id: string;
  language: LanguageType;
  level: string;
  duration: string;
  description: string;
  topics: string[];
  price: string;
}

export interface EnrollmentData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  language: LanguageType;
  courseLevel: string;
  preferredSchedule: string;
  message: string;
}

export interface SchoolFeature {
  title: string;
  description: string;
  icon: string;
}
