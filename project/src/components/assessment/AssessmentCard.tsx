import { Link } from 'react-router-dom';
import { Heart, Clock, Tag, Award } from 'lucide-react';
import { Assessment } from '../../types';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { useStore } from '../../store/useStore';

interface AssessmentCardProps {
  assessment: Assessment;
  showMatchScore?: boolean;
  matchScore?: number;
  matchReasons?: string[];
}

const AssessmentCard = ({ 
  assessment, 
  showMatchScore = false, 
  matchScore, 
  matchReasons = [] 
}: AssessmentCardProps) => {
  const { favorites, toggleFavorite, addToComparison } = useStore();
  const isFavorite = favorites.includes(assessment.id);

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

  const getDifficultyColor = (difficulty: string) => {
    const difficultyColors = {
      'beginner': 'success',
      'intermediate': 'warning',
      'advanced': 'error',
    };
    return difficultyColors[difficulty as keyof typeof difficultyColors] || 'default';
  };

  const handleCompare = () => {
    addToComparison(assessment);
  };

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:translate-y-[-5px]" hoverable>
      <div className="relative">
        <img 
          src={assessment.thumbnailUrl} 
          alt={assessment.name} 
          className="w-full h-48 object-cover object-center"
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(assessment.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200"
        >
          <Heart 
            size={20} 
            className={`${isFavorite ? 'fill-error-500 text-error-500' : 'text-gray-500'}`} 
          />
        </button>
        
        {showMatchScore && matchScore !== undefined && (
          <div className="absolute top-3 left-3 p-1 px-3 bg-primary-600 text-white font-bold rounded-full">
            {matchScore}% Match
          </div>
        )}
      </div>
      
      <CardBody className="flex-grow flex flex-col">
        <div className="mb-3">
          <Badge variant={getCategoryColor(assessment.category)}>
            {assessment.category}
          </Badge>
          <Badge variant={getDifficultyColor(assessment.difficulty)} className="ml-2">
            {assessment.difficulty}
          </Badge>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{assessment.name}</h3>
        
        <p className="text-gray-600 mb-3 text-sm flex-grow">
          {assessment.shortDescription}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Clock size={16} className="mr-1" />
          <span>{assessment.duration} minutes</span>
          <Tag size={16} className="ml-4 mr-1" />
          <span>{assessment.format}</span>
        </div>
        
        {showMatchScore && matchReasons && matchReasons.length > 0 && (
          <div className="mt-2 mb-3">
            <h4 className="text-sm font-medium flex items-center mb-1">
              <Award size={16} className="mr-1 text-primary-500" />
              Why it's a match:
            </h4>
            <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
              {matchReasons.slice(0, 2).map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
              {matchReasons.length > 2 && (
                <li className="text-primary-600">+{matchReasons.length - 2} more reasons</li>
              )}
            </ul>
          </div>
        )}
      </CardBody>
      
      <CardFooter className="flex justify-between items-center">
        <Link 
          to={`/assessment/${assessment.id}`}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          View Details
        </Link>
        
        <button 
          onClick={handleCompare}
          className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          Compare
        </button>
      </CardFooter>
    </Card>
  );
};

export default AssessmentCard;