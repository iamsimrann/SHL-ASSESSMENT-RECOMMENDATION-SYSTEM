import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Check, X, Info, Clock, Tag, Award, BarChart3, Target, Users } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Assessment } from '../types';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const ComparisonPage = () => {
  const { comparisonList, removeFromComparison, clearComparison } = useStore();
  const [emptySlots, setEmptySlots] = useState<number[]>([]);
  
  useEffect(() => {
    document.title = 'Compare SHL Assessments';
    
    // Calculate empty slots
    const slots = [];
    for (let i = 0; i < 3 - comparisonList.length; i++) {
      slots.push(i);
    }
    setEmptySlots(slots);
  }, [comparisonList.length]);
  
  // Find all unique skills across all assessments
  const allSkills = Array.from(
    new Set(
      comparisonList.flatMap(assessment => assessment.skillsAssessed)
    )
  );
  
  // Find all unique target roles across all assessments
  const allTargetRoles = Array.from(
    new Set(
      comparisonList.flatMap(assessment => assessment.targetRoles)
    )
  );
  
  const renderSkillComparison = (assessment: Assessment, skill: string) => {
    const hasSkill = assessment.skillsAssessed.includes(skill);
    return hasSkill ? 
      <Check size={20} className="text-success-500 mx-auto" /> : 
      <X size={20} className="text-gray-300 mx-auto" />;
  };
  
  const renderRoleComparison = (assessment: Assessment, role: string) => {
    const hasRole = assessment.targetRoles.includes(role);
    return hasRole ? 
      <Check size={20} className="text-success-500 mx-auto" /> : 
      <X size={20} className="text-gray-300 mx-auto" />;
  };
  
  const getCategoryColor = (category: string) => {
    const categoryColors = {
      'Cognitive Ability': 'primary',
      'Personality & Behavior': 'secondary',
      'Leadership': 'accent',
      'Technical Skills': 'success',
      'Situational Judgment': 'warning',
      'Emotional Intelligence': 'error',
      'Motivation & Values': 'secondary',
    };
    return categoryColors[category as keyof typeof categoryColors] || 'default';
  };
  
  if (comparisonList.length === 0) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Link to="/catalogue" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              <span>Back to Catalogue</span>
            </Link>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">Assessment Comparison</h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Add assessments to compare their features, benefits, and suitability side by side.
            </p>
          </div>
          
          <div className="text-center py-16 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">No assessments added yet</h3>
            <p className="text-gray-600 mb-4">
              Browse the catalogue and add assessments to compare them side by side.
            </p>
            <Link to="/catalogue">
              <Button variant="primary">
                Browse Assessments
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex justify-between items-center">
          <Link to="/catalogue" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Catalogue</span>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => clearComparison()}
            icon={<Trash2 size={16} />}
            className="text-error-600 border-error-600 hover:bg-error-50"
          >
            Clear All
          </Button>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Assessment Comparison</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Compare features, benefits, and suitability of these assessments side by side.
          </p>
        </div>
        
        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left w-1/4">Assessment</th>
                {comparisonList.map((assessment) => (
                  <th key={assessment.id} className="p-4 w-1/4 relative">
                    <div className="flex flex-col items-center">
                      <img 
                        src={assessment.thumbnailUrl} 
                        alt={assessment.name} 
                        className="w-full h-48 object-cover object-center rounded-md mb-3"
                      />
                      <Badge variant={getCategoryColor(assessment.category)} className="mb-2">
                        {assessment.category}
                      </Badge>
                      <h3 className="text-lg font-semibold mb-1">{assessment.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Clock size={16} className="mr-1" />
                        <span className="mr-3">{assessment.duration} min</span>
                        <Tag size={16} className="mr-1" />
                        <span>{assessment.format}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Link to={`/assessment/${assessment.id}`}>
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            View Details
                          </button>
                        </Link>
                        <button 
                          onClick={() => removeFromComparison(assessment.id)}
                          className="text-error-600 hover:text-error-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
                {emptySlots.map((slot) => (
                  <th key={`empty-${slot}`} className="p-4 w-1/4 relative">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md py-16 px-4">
                      <p className="text-gray-500 text-center mb-4">Add another assessment to compare</p>
                      <Link to="/catalogue">
                        <Button variant="outline" size="sm">
                          Add Assessment
                        </Button>
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Description Row */}
              <tr className="border-b bg-gray-50">
                <td className="p-4 font-medium flex items-center">
                  <Info size={18} className="mr-2 text-primary-600" />
                  Description
                </td>
                {comparisonList.map((assessment) => (
                  <td key={assessment.id} className="p-4 text-sm">
                    {assessment.shortDescription}
                  </td>
                ))}
                {emptySlots.map((slot) => (
                  <td key={`empty-${slot}`} className="p-4"></td>
                ))}
              </tr>
              
              {/* Skills Section */}
              <tr className="border-b bg-primary-50">
                <td className="p-4 font-semibold text-primary-700 flex items-center" colSpan={comparisonList.length + emptySlots.length + 1}>
                  <BarChart3 size={18} className="mr-2" />
                  Skills Assessed
                </td>
              </tr>
              
              {allSkills.map((skill, index) => (
                <tr key={skill} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4 font-medium">{skill}</td>
                  {comparisonList.map((assessment) => (
                    <td key={assessment.id} className="p-4 text-center">
                      {renderSkillComparison(assessment, skill)}
                    </td>
                  ))}
                  {emptySlots.map((slot) => (
                    <td key={`empty-${slot}`} className="p-4"></td>
                  ))}
                </tr>
              ))}
              
              {/* Target Roles Section */}
              <tr className="border-b bg-accent-50">
                <td className="p-4 font-semibold text-accent-700 flex items-center" colSpan={comparisonList.length + emptySlots.length + 1}>
                  <Target size={18} className="mr-2" />
                  Target Roles
                </td>
              </tr>
              
              {allTargetRoles.map((role, index) => (
                <tr key={role} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4 font-medium">{role}</td>
                  {comparisonList.map((assessment) => (
                    <td key={assessment.id} className="p-4 text-center">
                      {renderRoleComparison(assessment, role)}
                    </td>
                  ))}
                  {emptySlots.map((slot) => (
                    <td key={`empty-${slot}`} className="p-4"></td>
                  ))}
                </tr>
              ))}
              
              {/* Benefits Section */}
              <tr className="border-b bg-secondary-50">
                <td className="p-4 font-semibold text-secondary-700 flex items-center" colSpan={comparisonList.length + emptySlots.length + 1}>
                  <Award size={18} className="mr-2" />
                  Key Benefits
                </td>
              </tr>
              
              <tr>
                <td className="p-4 font-medium">Main Benefits</td>
                {comparisonList.map((assessment) => (
                  <td key={assessment.id} className="p-4">
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {assessment.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                      {assessment.benefits.length > 3 && (
                        <li className="text-primary-600">+{assessment.benefits.length - 3} more</li>
                      )}
                    </ul>
                  </td>
                ))}
                {emptySlots.map((slot) => (
                  <td key={`empty-${slot}`} className="p-4"></td>
                ))}
              </tr>
              
              {/* Validation Section */}
              <tr className="border-b bg-warning-50">
                <td className="p-4 font-semibold text-warning-700 flex items-center" colSpan={comparisonList.length + emptySlots.length + 1}>
                  <Users size={18} className="mr-2" />
                  Validation
                </td>
              </tr>
              
              <tr>
                <td className="p-4 font-medium">Validated For</td>
                {comparisonList.map((assessment) => (
                  <td key={assessment.id} className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {assessment.validatedFor.map((item, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
                {emptySlots.map((slot) => (
                  <td key={`empty-${slot}`} className="p-4"></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg py-8 px-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to implement these assessments?</h2>
            <p className="mb-6 max-w-xl mx-auto">
              Contact our team to discuss your selection and get started with the SHL assessments that best fit your needs.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/contact">
                <Button variant="accent" size="lg">
                  Request a Consultation
                </Button>
              </Link>
              <Link to="/catalogue">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                  Add More Assessments
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComparisonPage;