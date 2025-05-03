import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, Check } from 'lucide-react';
import { assessments } from '../data/assessments';
import { Assessment, AssessmentCategory, AssessmentFormat } from '../types';
import { useStore } from '../store/useStore';
import AssessmentCard from '../components/assessment/AssessmentCard';
import Button from '../components/ui/Button';

const categories: AssessmentCategory[] = [
  'Cognitive Ability',
  'Personality & Behavior',
  'Leadership',
  'Technical Skills',
  'Situational Judgment',
  'Emotional Intelligence',
  'Motivation & Values'
];

const formats: AssessmentFormat[] = [
  'Multiple Choice',
  'Simulation',
  'Game-based',
  'Interactive Scenario',
  'Questionnaire',
  'Coding Challenge'
];

const difficultyLevels = ['beginner', 'intermediate', 'advanced'];

const CataloguePage = () => {
  const { searchFilters, updateSearchFilters, resetSearchFilters } = useStore();
  const [searchQuery, setSearchQuery] = useState(searchFilters.searchQuery);
  const [filteredAssessments, setFilteredAssessments] = useState<Assessment[]>(assessments);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    document.title = 'SHL Assessment Catalogue';
  }, []);
  
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Apply search query
  const applySearch = () => {
    updateSearchFilters({ searchQuery });
  };
  
  // Toggle category filter
  const toggleCategory = (category: AssessmentCategory) => {
    const updatedCategories = searchFilters.categories.includes(category)
      ? searchFilters.categories.filter(c => c !== category)
      : [...searchFilters.categories, category];
    
    updateSearchFilters({ categories: updatedCategories });
  };
  
  // Toggle format filter
  const toggleFormat = (format: AssessmentFormat) => {
    const updatedFormats = searchFilters.formats.includes(format)
      ? searchFilters.formats.filter(f => f !== format)
      : [...searchFilters.formats, format];
    
    updateSearchFilters({ formats: updatedFormats });
  };
  
  // Toggle difficulty filter
  const toggleDifficulty = (difficulty: string) => {
    const updatedDifficulty = searchFilters.difficulty.includes(difficulty as any)
      ? searchFilters.difficulty.filter(d => d !== difficulty)
      : [...searchFilters.difficulty, difficulty as any];
    
    updateSearchFilters({ difficulty: updatedDifficulty });
  };
  
  // Handle duration filter changes
  const handleDurationChange = (type: 'min' | 'max', value: number) => {
    updateSearchFilters({
      duration: {
        ...searchFilters.duration,
        [type]: value
      }
    });
  };
  
  // Apply filters to assessments
  useEffect(() => {
    let result = [...assessments];
    
    // Apply search query
    if (searchFilters.searchQuery) {
      const query = searchFilters.searchQuery.toLowerCase();
      result = result.filter(assessment => 
        assessment.name.toLowerCase().includes(query) ||
        assessment.description.toLowerCase().includes(query) ||
        assessment.category.toLowerCase().includes(query) ||
        assessment.format.toLowerCase().includes(query) ||
        assessment.skillsAssessed.some(skill => skill.toLowerCase().includes(query)) ||
        assessment.targetRoles.some(role => role.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (searchFilters.categories.length > 0) {
      result = result.filter(assessment => 
        searchFilters.categories.includes(assessment.category)
      );
    }
    
    // Apply format filter
    if (searchFilters.formats.length > 0) {
      result = result.filter(assessment => 
        searchFilters.formats.includes(assessment.format)
      );
    }
    
    // Apply difficulty filter
    if (searchFilters.difficulty.length > 0) {
      result = result.filter(assessment => 
        searchFilters.difficulty.includes(assessment.difficulty as any)
      );
    }
    
    // Apply duration filter
    result = result.filter(assessment => 
      assessment.duration >= searchFilters.duration.min &&
      assessment.duration <= searchFilters.duration.max
    );
    
    setFilteredAssessments(result);
  }, [searchFilters]);
  
  // Reset form when clearing filters
  const handleResetFilters = () => {
    resetSearchFilters();
    setSearchQuery('');
  };
  
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">SHL Assessment Catalogue</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of SHL assessments. Use the filters to find exactly what you need.
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search assessments by name, skills, or roles..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === 'Enter' && applySearch()}
                className="pl-10 input"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="primary" 
                onClick={applySearch}
              >
                Search
              </Button>
              
              <Button 
                variant={isFilterOpen ? 'secondary' : 'outline'} 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                icon={<Filter size={16} />}
              >
                Filter
              </Button>
            </div>
          </div>
          
          {/* Filter Panel */}
          {isFilterOpen && (
            <motion.div 
              className="mt-4 bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filter Assessments</h3>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  icon={<X size={16} />}
                >
                  Close
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-medium mb-2">Assessment Category</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div 
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className="flex items-center cursor-pointer"
                      >
                        <div className={`w-4 h-4 mr-2 rounded flex items-center justify-center
                          ${searchFilters.categories.includes(category) 
                            ? 'bg-primary-600 border-primary-600' 
                            : 'border border-gray-400'
                          }
                        `}>
                          {searchFilters.categories.includes(category) && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                        <span className="text-sm">{category}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Format Filter */}
                <div>
                  <h4 className="font-medium mb-2">Assessment Format</h4>
                  <div className="space-y-2">
                    {formats.map(format => (
                      <div 
                        key={format}
                        onClick={() => toggleFormat(format)}
                        className="flex items-center cursor-pointer"
                      >
                        <div className={`w-4 h-4 mr-2 rounded flex items-center justify-center
                          ${searchFilters.formats.includes(format) 
                            ? 'bg-primary-600 border-primary-600' 
                            : 'border border-gray-400'
                          }
                        `}>
                          {searchFilters.formats.includes(format) && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                        <span className="text-sm">{format}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Difficulty Filter */}
                <div>
                  <h4 className="font-medium mb-2">Difficulty Level</h4>
                  <div className="space-y-2">
                    {difficultyLevels.map(difficulty => (
                      <div 
                        key={difficulty}
                        onClick={() => toggleDifficulty(difficulty)}
                        className="flex items-center cursor-pointer"
                      >
                        <div className={`w-4 h-4 mr-2 rounded flex items-center justify-center
                          ${searchFilters.difficulty.includes(difficulty as any) 
                            ? 'bg-primary-600 border-primary-600' 
                            : 'border border-gray-400'
                          }
                        `}>
                          {searchFilters.difficulty.includes(difficulty as any) && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                        <span className="text-sm capitalize">{difficulty}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Duration Filter */}
                <div>
                  <h4 className="font-medium mb-2">Duration (minutes)</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600">Min Duration: {searchFilters.duration.min} min</label>
                      <input
                        type="range"
                        min="0"
                        max="120"
                        step="15"
                        value={searchFilters.duration.min}
                        onChange={(e) => handleDurationChange('min', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Max Duration: {searchFilters.duration.max} min</label>
                      <input
                        type="range"
                        min="0"
                        max="120"
                        step="15"
                        value={searchFilters.duration.max}
                        onChange={(e) => handleDurationChange('max', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={handleResetFilters}
                >
                  Clear Filters
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Active Filters */}
        {(searchFilters.searchQuery || 
          searchFilters.categories.length > 0 || 
          searchFilters.formats.length > 0 ||
          searchFilters.difficulty.length > 0 ||
          searchFilters.duration.min > 0 ||
          searchFilters.duration.max < 120) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Active Filters:</span>
            
            {searchFilters.searchQuery && (
              <div className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center">
                <span>Search: {searchFilters.searchQuery}</span>
                <button 
                  onClick={() => updateSearchFilters({ searchQuery: '' })}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {searchFilters.categories.map(category => (
              <div key={category} className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full flex items-center">
                <span>{category}</span>
                <button 
                  onClick={() => toggleCategory(category)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            
            {searchFilters.formats.map(format => (
              <div key={format} className="bg-secondary-100 text-secondary-800 text-sm px-3 py-1 rounded-full flex items-center">
                <span>{format}</span>
                <button 
                  onClick={() => toggleFormat(format)}
                  className="ml-2 text-secondary-600 hover:text-secondary-800"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            
            {searchFilters.difficulty.map(difficulty => (
              <div key={difficulty} className="bg-accent-100 text-accent-800 text-sm px-3 py-1 rounded-full flex items-center">
                <span className="capitalize">{difficulty}</span>
                <button 
                  onClick={() => toggleDifficulty(difficulty)}
                  className="ml-2 text-accent-600 hover:text-accent-800"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            
            {(searchFilters.duration.min > 0 || searchFilters.duration.max < 120) && (
              <div className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center">
                <span>Duration: {searchFilters.duration.min}-{searchFilters.duration.max} min</span>
                <button 
                  onClick={() => updateSearchFilters({ duration: { min: 0, max: 120 } })}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            <button 
              onClick={handleResetFilters}
              className="text-sm text-primary-600 hover:text-primary-800 font-medium underline"
            >
              Clear All
            </button>
          </div>
        )}
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAssessments.length} of {assessments.length} assessments
          </p>
        </div>
        
        {/* Assessment Grid */}
        {filteredAssessments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAssessments.map((assessment, index) => (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AssessmentCard assessment={assessment} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">No assessments found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              onClick={handleResetFilters}
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CataloguePage;