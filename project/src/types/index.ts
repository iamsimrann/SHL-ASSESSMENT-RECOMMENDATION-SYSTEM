// Assessment Types
export interface Assessment {
  id: string;
  name: string;
  category: AssessmentCategory;
  description: string;
  shortDescription: string;
  benefits: string[];
  features: string[];
  targetRoles: string[];
  skillsAssessed: string[];
  duration: number; // in minutes
  format: AssessmentFormat;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number; // 1-10 scale
  thumbnailUrl: string;
  validatedFor: string[];
}

export type AssessmentCategory = 
  | 'Cognitive Ability'
  | 'Personality & Behavior'
  | 'Leadership'
  | 'Technical Skills'
  | 'Situational Judgment'
  | 'Emotional Intelligence'
  | 'Motivation & Values';

export type AssessmentFormat = 
  | 'Multiple Choice'
  | 'Simulation'
  | 'Game-based'
  | 'Interactive Scenario'
  | 'Questionnaire'
  | 'Coding Challenge';

// User Preferences & Questionnaire
export interface UserPreferences {
  organization: {
    size: OrganizationSize;
    industry: string;
    hiringVolume: HiringVolume;
  };
  assessmentGoals: AssessmentGoal[];
  targetRoles: string[];
  skillsToAssess: string[];
  candidateExperience: CandidateExperience;
  maxDuration: number; // in minutes
  budget: BudgetRange;
}

export type OrganizationSize = 
  | 'small' // < 50 employees
  | 'medium' // 50-500 employees
  | 'large' // 500-5000 employees
  | 'enterprise'; // > 5000 employees

export type HiringVolume = 
  | 'low' // < 10 per month
  | 'medium' // 10-50 per month
  | 'high'; // > 50 per month

export type AssessmentGoal = 
  | 'hiring'
  | 'development'
  | 'succession-planning'
  | 'team-building'
  | 'leadership-development';

export type CandidateExperience = 
  | 'entry-level'
  | 'mid-level'
  | 'senior-level'
  | 'executive';

export type BudgetRange = 
  | 'low' // < $5,000
  | 'medium' // $5,000 - $25,000
  | 'high' // $25,000 - $100,000
  | 'enterprise'; // > $100,000

// Search and Filter
export interface SearchFilters {
  categories: AssessmentCategory[];
  formats: AssessmentFormat[];
  duration: {
    min: number;
    max: number;
  };
  skills: string[];
  difficulty: ('beginner' | 'intermediate' | 'advanced')[];
  searchQuery: string;
}

// Recommendation
export interface Recommendation {
  assessment: Assessment;
  matchScore: number; // 0-100
  matchReasons: string[];
}