import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { UserPreferences, AssessmentGoal, OrganizationSize, HiringVolume, CandidateExperience, BudgetRange } from '../types';
import { useStore } from '../store/useStore';

// Sample data for form fields
const industries = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 
  'Retail', 'Government', 'Consulting', 'Hospitality', 'Non-profit',
];

const roles = [
  'Software Developer', 'Project Manager', 'Customer Service', 'Sales Representative', 
  'Marketing Specialist', 'Human Resources', 'Operations Manager', 'Data Analyst', 
  'Financial Analyst', 'Executive Leadership', 'Administrative', 'Technical Support',
];

const skills = [
  'Problem Solving', 'Critical Thinking', 'Communication', 'Leadership', 
  'Teamwork', 'Time Management', 'Technical Proficiency', 'Creativity', 
  'Adaptability', 'Emotional Intelligence', 'Decision Making', 'Analytical Thinking',
  'Customer Service', 'Sales Ability', 'Programming', 'Data Analysis',
];

const assessmentGoals: AssessmentGoal[] = [
  'hiring', 'development', 'succession-planning', 'team-building', 'leadership-development'
];

const goalLabels: Record<AssessmentGoal, string> = {
  'hiring': 'Hiring & Selection',
  'development': 'Employee Development',
  'succession-planning': 'Succession Planning',
  'team-building': 'Team Building',
  'leadership-development': 'Leadership Development'
};

const orgSizes: OrganizationSize[] = ['small', 'medium', 'large', 'enterprise'];
const orgSizeLabels: Record<OrganizationSize, string> = {
  'small': 'Small (<50 employees)',
  'medium': 'Medium (50-500 employees)',
  'large': 'Large (500-5000 employees)',
  'enterprise': 'Enterprise (>5000 employees)'
};

const hiringVolumes: HiringVolume[] = ['low', 'medium', 'high'];
const hiringVolumeLabels: Record<HiringVolume, string> = {
  'low': 'Low (<10 per month)',
  'medium': 'Medium (10-50 per month)',
  'high': 'High (>50 per month)'
};

const candidateExperiences: CandidateExperience[] = ['entry-level', 'mid-level', 'senior-level', 'executive'];
const candidateExperienceLabels: Record<CandidateExperience, string> = {
  'entry-level': 'Entry Level',
  'mid-level': 'Mid Level',
  'senior-level': 'Senior Level',
  'executive': 'Executive'
};

const budgets: BudgetRange[] = ['low', 'medium', 'high', 'enterprise'];
const budgetLabels: Record<BudgetRange, string> = {
  'low': 'Low (<$5,000)',
  'medium': 'Medium ($5,000 - $25,000)',
  'high': 'High ($25,000 - $100,000)',
  'enterprise': 'Enterprise (>$100,000)'
};

// Define step interfaces
interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  { 
    title: 'Organization Information', 
    description: 'Tell us about your organization to help us understand your context.' 
  },
  { 
    title: 'Assessment Purpose', 
    description: 'What are your goals for using these assessments?' 
  },
  { 
    title: 'Target Roles & Skills', 
    description: 'Which roles and skills do you need to assess?' 
  },
  { 
    title: 'Assessment Preferences', 
    description: 'Tell us about your preferences for assessment format and duration.' 
  }
];

const QuestionnairePage = () => {
  const navigate = useNavigate();
  const { setUserPreferences } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Initialize form state
  const [formData, setFormData] = useState<UserPreferences>({
    organization: {
      size: 'medium',
      industry: '',
      hiringVolume: 'medium',
    },
    assessmentGoals: [],
    targetRoles: [],
    skillsToAssess: [],
    candidateExperience: 'mid-level',
    maxDuration: 60,
    budget: 'medium',
  });

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof UserPreferences],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle checkbox changes for multi-select fields
  const handleCheckboxChange = (field: keyof UserPreferences, value: string) => {
    setFormData({
      ...formData,
      [field]: (formData[field] as string[]).includes(value)
        ? (formData[field] as string[]).filter(item => item !== value)
        : [...(formData[field] as string[]), value]
    });
  };

  // Handle navigation between steps
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      setUserPreferences(formData);
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.organization.industry !== '';
      case 1:
        return formData.assessmentGoals.length > 0;
      case 2:
        return formData.targetRoles.length > 0 && formData.skillsToAssess.length > 0;
      case 3:
        return true; // All fields have defaults
      default:
        return false;
    }
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Find Your Perfect SHL Assessment</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Answer a few questions about your needs, and we'll recommend the most suitable SHL assessments for your organization.
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                    ${index < currentStep 
                      ? 'bg-primary-600 text-white' 
                      : index === currentStep 
                        ? 'bg-primary-100 border-2 border-primary-600 text-primary-600' 
                        : 'bg-gray-100 text-gray-400'}`}
                >
                  {index < currentStep ? (
                    <Check size={20} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={`text-xs text-center ${index === currentStep ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded"></div>
            <div 
              className="absolute top-0 left-0 h-1 bg-primary-600 rounded transition-all duration-300" 
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Form Steps */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{steps[currentStep].title}</h2>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {/* Step 1: Organization Information */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select 
                    name="organization.industry" 
                    value={formData.organization.industry}
                    onChange={handleChange}
                    className="select px-3 py-2"
                    required
                  >
                    <option value="">Select industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Size
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {orgSizes.map(size => (
                      <div 
                        key={size}
                        onClick={() => setFormData({
                          ...formData,
                          organization: {
                            ...formData.organization,
                            size
                          }
                        })}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors duration-200
                          ${formData.organization.size === size 
                            ? 'border-primary-600 bg-primary-50 text-primary-700' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 mr-2 rounded-full border flex items-center justify-center
                            ${formData.organization.size === size ? 'border-primary-600' : 'border-gray-400'}
                          `}>
                            {formData.organization.size === size && (
                              <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                            )}
                          </div>
                          <span className="text-sm">{orgSizeLabels[size]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hiring Volume
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {hiringVolumes.map(volume => (
                      <div 
                        key={volume}
                        onClick={() => setFormData({
                          ...formData,
                          organization: {
                            ...formData.organization,
                            hiringVolume: volume
                          }
                        })}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors duration-200
                          ${formData.organization.hiringVolume === volume 
                            ? 'border-primary-600 bg-primary-50 text-primary-700' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 mr-2 rounded-full border flex items-center justify-center
                            ${formData.organization.hiringVolume === volume ? 'border-primary-600' : 'border-gray-400'}
                          `}>
                            {formData.organization.hiringVolume === volume && (
                              <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                            )}
                          </div>
                          <span className="text-sm">{hiringVolumeLabels[volume]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Assessment Purpose */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What are your goals for using assessments? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {assessmentGoals.map(goal => (
                      <div 
                        key={goal}
                        onClick={() => handleCheckboxChange('assessmentGoals', goal)}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors duration-200
                          ${formData.assessmentGoals.includes(goal) 
                            ? 'border-primary-600 bg-primary-50 text-primary-700' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 mr-2 rounded flex items-center justify-center
                            ${formData.assessmentGoals.includes(goal) 
                              ? 'bg-primary-600 border-primary-600' 
                              : 'border border-gray-400'
                            }
                          `}>
                            {formData.assessmentGoals.includes(goal) && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <span className="text-sm">{goalLabels[goal]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level of Candidates
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {candidateExperiences.map(experience => (
                      <div 
                        key={experience}
                        onClick={() => setFormData({
                          ...formData,
                          candidateExperience: experience
                        })}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors duration-200
                          ${formData.candidateExperience === experience 
                            ? 'border-primary-600 bg-primary-50 text-primary-700' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 mr-2 rounded-full border flex items-center justify-center
                            ${formData.candidateExperience === experience ? 'border-primary-600' : 'border-gray-400'}
                          `}>
                            {formData.candidateExperience === experience && (
                              <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                            )}
                          </div>
                          <span className="text-sm">{candidateExperienceLabels[experience]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Range
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {budgets.map(budget => (
                      <div 
                        key={budget}
                        onClick={() => setFormData({
                          ...formData,
                          budget
                        })}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors duration-200
                          ${formData.budget === budget 
                            ? 'border-primary-600 bg-primary-50 text-primary-700' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 mr-2 rounded-full border flex items-center justify-center
                            ${formData.budget === budget ? 'border-primary-600' : 'border-gray-400'}
                          `}>
                            {formData.budget === budget && (
                              <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                            )}
                          </div>
                          <span className="text-sm">{budgetLabels[budget]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Target Roles & Skills */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Which roles are you looking to assess? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {roles.map(role => (
                      <div 
                        key={role}
                        onClick={() => handleCheckboxChange('targetRoles', role)}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors duration-200
                          ${formData.targetRoles.includes(role) 
                            ? 'border-primary-600 bg-primary-50 text-primary-700' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 mr-2 rounded flex items-center justify-center
                            ${formData.targetRoles.includes(role) 
                              ? 'bg-primary-600 border-primary-600' 
                              : 'border border-gray-400'
                            }
                          `}>
                            {formData.targetRoles.includes(role) && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <span className="text-sm">{role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Which skills are you looking to assess? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {skills.map(skill => (
                      <div 
                        key={skill}
                        onClick={() => handleCheckboxChange('skillsToAssess', skill)}
                        className={`
                          border rounded-md p-3 cursor-pointer transition-colors duration-200
                          ${formData.skillsToAssess.includes(skill) 
                            ? 'border-primary-600 bg-primary-50 text-primary-700' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 mr-2 rounded flex items-center justify-center
                            ${formData.skillsToAssess.includes(skill) 
                              ? 'bg-primary-600 border-primary-600' 
                              : 'border border-gray-400'
                            }
                          `}>
                            {formData.skillsToAssess.includes(skill) && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <span className="text-sm">{skill}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Assessment Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Maximum Assessment Duration (in minutes)
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="15"
                    value={formData.maxDuration}
                    onChange={(e) => setFormData({
                      ...formData,
                      maxDuration: parseInt(e.target.value)
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>15 min</span>
                    <span>30 min</span>
                    <span>45 min</span>
                    <span>60 min</span>
                    <span>75 min</span>
                    <span>90 min</span>
                    <span>105 min</span>
                    <span>120 min</span>
                  </div>
                  <p className="text-center mt-3 font-medium">Selected: {formData.maxDuration} minutes</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 0}
              icon={<ChevronLeft size={16} />}
              iconPosition="left"
            >
              Back
            </Button>
            
            <Button 
              variant="primary" 
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
              icon={<ChevronRight size={16} />}
              iconPosition="right"
            >
              {currentStep < steps.length - 1 ? 'Next' : 'Get Recommendations'}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestionnairePage;