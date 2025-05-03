import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Clock, Tag, Award, ArrowLeft, BarChart3, Check, Package, Target, Users, PlusCircle } from 'lucide-react';
import { getAssessmentById } from '../data/assessments';
import { Assessment } from '../types';
import { useStore } from '../store/useStore';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card, { CardBody } from '../components/ui/Card';

const AssessmentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const { favorites, toggleFavorite, addToComparison } = useStore();
  
  useEffect(() => {
    if (id) {
      const assessmentData = getAssessmentById(id);
      if (assessmentData) {
        setAssessment(assessmentData);
        document.title = `${assessmentData.name} - SHL Assessment`;
      } else {
        navigate('/not-found');
      }
    }
  }, [id, navigate]);
  
  if (!assessment) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <p>Loading assessment details...</p>
      </div>
    );
  }
  
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
  
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/catalogue" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Catalogue</span>
          </Link>
        </div>
        
        {/* Assessment Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={assessment.thumbnailUrl} 
                alt={assessment.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <div className="p-6 md:w-2/3">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant={getCategoryColor(assessment.category)} size="md">
                    {assessment.category}
                  </Badge>
                  
                  <h1 className="text-3xl font-bold mt-3 mb-2 text-gray-900">{assessment.name}</h1>
                  
                  <div className="flex items-center text-gray-500 mb-4">
                    <Clock size={18} className="mr-1" />
                    <span className="mr-4">{assessment.duration} minutes</span>
                    <Tag size={18} className="mr-1" />
                    <span>{assessment.format}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => toggleFavorite(assessment.id)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <Heart 
                    size={24} 
                    className={`${isFavorite ? 'fill-error-500 text-error-500' : 'text-gray-400'}`} 
                  />
                </button>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {assessment.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="primary" 
                  onClick={() => {}}
                  icon={<PlusCircle size={18} />}
                >
                  Request This Assessment
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => addToComparison(assessment)}
                  icon={<BarChart3 size={18} />}
                >
                  Add to Comparison
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Assessment Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardBody>
                <div className="flex items-center mb-4 text-primary-600">
                  <Award size={24} className="mr-2" />
                  <h3 className="text-xl font-semibold">Benefits</h3>
                </div>
                
                <ul className="space-y-3">
                  {assessment.benefits.map((benefit, index) => (
                    <li key={index} className="flex">
                      <Check size={18} className="mr-2 text-success-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </motion.div>
          
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardBody>
                <div className="flex items-center mb-4 text-secondary-600">
                  <Package size={24} className="mr-2" />
                  <h3 className="text-xl font-semibold">Features</h3>
                </div>
                
                <ul className="space-y-3">
                  {assessment.features.map((feature, index) => (
                    <li key={index} className="flex">
                      <Check size={18} className="mr-2 text-success-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </motion.div>
          
          {/* Target Roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardBody>
                <div className="flex items-center mb-4 text-accent-600">
                  <Target size={24} className="mr-2" />
                  <h3 className="text-xl font-semibold">Target Roles</h3>
                </div>
                
                <ul className="space-y-3">
                  {assessment.targetRoles.map((role, index) => (
                    <li key={index} className="flex">
                      <Check size={18} className="mr-2 text-success-500 flex-shrink-0 mt-0.5" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </motion.div>
        </div>
        
        {/* Skills Assessed & Validation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Skills Assessed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardBody>
                <div className="flex items-center mb-4 text-primary-600">
                  <BarChart3 size={24} className="mr-2" />
                  <h3 className="text-xl font-semibold">Skills Assessed</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {assessment.skillsAssessed.map((skill, index) => (
                    <Badge key={index} variant="primary" className="py-1 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
          
          {/* Validation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardBody>
                <div className="flex items-center mb-4 text-secondary-600">
                  <Users size={24} className="mr-2" />
                  <h3 className="text-xl font-semibold">Validated For</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {assessment.validatedFor.map((item, index) => (
                    <Badge key={index} variant="secondary" className="py-1 px-3">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg py-8 px-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Interested in this assessment?</h2>
            <p className="mb-6 max-w-xl mx-auto">
              Contact our team to learn more about how this assessment can help your organization identify top talent.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/contact">
                <Button variant="accent" size="lg">
                  Contact Us
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => addToComparison(assessment)}
              >
                Add to Comparison
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AssessmentDetailPage;