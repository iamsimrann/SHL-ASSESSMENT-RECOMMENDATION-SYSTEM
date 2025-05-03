import { create } from 'zustand';
import { Assessment, UserPreferences, SearchFilters, Recommendation } from '../types';
import { assessments } from '../data/assessments';

interface StoreState {
  // User preferences from questionnaire
  userPreferences: UserPreferences | null;
  setUserPreferences: (preferences: UserPreferences) => void;
  
  // Search & filters
  searchFilters: SearchFilters;
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;
  
  // Recommendations
  recommendations: Recommendation[];
  generateRecommendations: () => void;
  
  // Comparison
  comparisonList: Assessment[];
  addToComparison: (assessment: Assessment) => void;
  removeFromComparison: (assessmentId: string) => void;
  clearComparison: () => void;
  
  // Favorites
  favorites: string[]; // assessment IDs
  toggleFavorite: (assessmentId: string) => void;
}

const DEFAULT_SEARCH_FILTERS: SearchFilters = {
  categories: [],
  formats: [],
  duration: {
    min: 0,
    max: 120
  },
  skills: [],
  difficulty: [],
  searchQuery: '',
};

// Simple recommendation algorithm based on preferences
const getRecommendations = (preferences: UserPreferences): Recommendation[] => {
  if (!preferences) return [];
  
  return assessments.map(assessment => {
    // Calculate base match score (0-100)
    let matchScore = 0;
    const matchReasons: string[] = [];
    
    // Check target roles match (high importance)
    const roleMatches = assessment.targetRoles.filter(role => 
      preferences.targetRoles.some(prefRole => 
        prefRole.toLowerCase().includes(role.toLowerCase()) || 
        role.toLowerCase().includes(prefRole.toLowerCase())
      )
    );
    
    if (roleMatches.length > 0) {
      const roleScore = Math.min(roleMatches.length * 15, 30);
      matchScore += roleScore;
      matchReasons.push(`Matches ${roleMatches.length} of your target roles`);
    }
    
    // Check skills assessed match (high importance)
    const skillMatches = assessment.skillsAssessed.filter(skill => 
      preferences.skillsToAssess.some(prefSkill => 
        prefSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(prefSkill.toLowerCase())
      )
    );
    
    if (skillMatches.length > 0) {
      const skillScore = Math.min(skillMatches.length * 10, 40);
      matchScore += skillScore;
      matchReasons.push(`Assesses ${skillMatches.length} of your required skills`);
    }
    
    // Check duration preference (medium importance)
    if (assessment.duration <= preferences.maxDuration) {
      matchScore += 15;
      matchReasons.push(`Duration fits within your ${preferences.maxDuration} minute limit`);
    } else {
      matchScore -= 10;
    }
    
    // Check candidate experience match (medium importance)
    const difficultyMap = {
      'entry-level': ['beginner', 'intermediate'],
      'mid-level': ['intermediate'],
      'senior-level': ['intermediate', 'advanced'],
      'executive': ['advanced']
    };
    
    if (difficultyMap[preferences.candidateExperience].includes(assessment.difficulty)) {
      matchScore += 15;
      matchReasons.push(`Appropriate difficulty level for ${preferences.candidateExperience} candidates`);
    }
    
    // Add popularity bonus (low importance)
    matchScore += assessment.popularity;
    
    // Ensure score is between 0-100
    matchScore = Math.max(0, Math.min(matchScore, 100));
    
    return {
      assessment,
      matchScore,
      matchReasons
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
};

export const useStore = create<StoreState>((set, get) => ({
  // User preferences
  userPreferences: null,
  setUserPreferences: (preferences) => {
    set({ userPreferences: preferences });
    // Generate recommendations automatically when preferences are set
    get().generateRecommendations();
  },
  
  // Search & filters
  searchFilters: DEFAULT_SEARCH_FILTERS,
  updateSearchFilters: (filters) => {
    set((state) => ({ 
      searchFilters: { ...state.searchFilters, ...filters } 
    }));
  },
  resetSearchFilters: () => {
    set({ searchFilters: DEFAULT_SEARCH_FILTERS });
  },
  
  // Recommendations
  recommendations: [],
  generateRecommendations: () => {
    const { userPreferences } = get();
    if (userPreferences) {
      const recommendations = getRecommendations(userPreferences);
      set({ recommendations });
    }
  },
  
  // Comparison
  comparisonList: [],
  addToComparison: (assessment) => {
    set((state) => {
      // Check if assessment is already in comparison list
      if (state.comparisonList.some(item => item.id === assessment.id)) {
        return state; // No change if already in list
      }
      
      // Limit to 3 assessments for comparison
      const newList = state.comparisonList.length >= 3 
        ? [...state.comparisonList.slice(1), assessment] 
        : [...state.comparisonList, assessment];
        
      return { comparisonList: newList };
    });
  },
  removeFromComparison: (assessmentId) => {
    set((state) => ({
      comparisonList: state.comparisonList.filter(item => item.id !== assessmentId)
    }));
  },
  clearComparison: () => {
    set({ comparisonList: [] });
  },
  
  // Favorites
  favorites: [],
  toggleFavorite: (assessmentId) => {
    set((state) => {
      if (state.favorites.includes(assessmentId)) {
        return { 
          favorites: state.favorites.filter(id => id !== assessmentId) 
        };
      } else {
        return { 
          favorites: [...state.favorites, assessmentId] 
        };
      }
    });
  }
}));