import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Filter, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import AssessmentCard from '../components/assessment/AssessmentCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { userPreferences, recommendations, generateRecommendations } = useStore();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // If no user preferences, redirect to questionnaire
    if (!userPreferences) {
      navigate('/questionnaire');
      return;
    }
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    document.title = 'Your SHL Assessment Recommendations';
    
    return () => clearTimeout(timer);
  }, [userPreferences, navigate]);
  
  // If recommendations are empty, regenerate them
  useEffect(() => {
    if (userPreferences && recommendations.length === 0) {
      generateRecommendations();
    }
  }, [userPreferences, recommendations, generateRecommendations]);
  
  if (!userPreferences) {
    return null; // Will redirect in useEffect
  }
  
  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" className="mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Analyzing Your Requirements</h2>
          <p className="text-gray-600">Finding the perfect SHL assessments for your needs...</p>
        </div>
      </div>
    );
  }
  
  const topRecommendations = recommendations.slice(0, 3);
  const otherRecommendations = recommendations.slice(3, 9);
  
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Your Recommended SHL Assessments</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your requirements, we've identified the following assessments as the best matches for your organization's needs.
          </p>
        </div>
        
        {/* Top Recommendations */}
        {topRecommendations.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Top Matches</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topRecommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.assessment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AssessmentCard 
                    assessment={recommendation.assessment}
                    showMatchScore={true}
                    matchScore={recommendation.matchScore}
                    matchReasons={recommendation.matchReasons}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}
        
        {/* Other Recommendations */}
        {otherRecommendations.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Other Strong Matches</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherRecommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.assessment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <AssessmentCard 
                    assessment={recommendation.assessment}
                    showMatchScore={true}
                    matchScore={recommendation.matchScore}
                    matchReasons={recommendation.matchReasons}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}
        
        {/* Action Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold mb-3">Refine Your Search</h3>
                <p className="text-gray-600 mb-4">
                  Need different results? Update your preferences to get more tailored recommendations.
                </p>
                <Link to="/questionnaire">
                  <Button variant="outline" icon={<RefreshCw size={16} />}>
                    Update Preferences
                  </Button>
                </Link>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold mb-3">Browse Full Catalogue</h3>
                <p className="text-gray-600 mb-4">
                  Explore all available SHL assessments with advanced filtering options.
                </p>
                <Link to="/catalogue">
                  <Button variant="outline" icon={<Filter size={16} />}>
                    Browse Catalogue
                  </Button>
                </Link>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold mb-3">Compare Assessments</h3>
                <p className="text-gray-600 mb-4">
                  View your selected assessments side by side to make the best choice.
                </p>
                <Link to="/compare">
                  <Button variant="outline" icon={<ChevronRight size={16} />} iconPosition="right">
                    Compare Selected
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultsPage;