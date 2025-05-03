import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BarChart3, BookOpen, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';

const HomePage = () => {
  useEffect(() => {
    document.title = 'SHL Assessment Finder - Find the Perfect Assessment';
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Find the Perfect SHL Assessment for Your Needs
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8 text-primary-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our intelligent recommendation engine helps you discover the most suitable assessments from SHL's comprehensive catalogue.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/questionnaire">
                <Button variant="accent" size="lg" icon={<Search size={20} />}>
                  Find Assessments
                </Button>
              </Link>
              <Link to="/catalogue">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10" icon={<BookOpen size={20} />}>
                  Browse Catalogue
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            How Our Recommendation Engine Works
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn}>
              <Card className="h-full">
                <CardBody className="text-center p-8">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={32} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">1. Share Your Requirements</h3>
                  <p className="text-gray-600">
                    Tell us about your organization, the skills you're looking to assess, and your specific requirements.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card className="h-full">
                <CardBody className="text-center p-8">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 size={32} className="text-secondary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Get Personalized Results</h3>
                  <p className="text-gray-600">
                    Our algorithm analyzes your needs and matches them with the most suitable assessments from SHL's catalogue.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card className="h-full">
                <CardBody className="text-center p-8">
                  <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={32} className="text-accent-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Make Informed Decisions</h3>
                  <p className="text-gray-600">
                    Compare recommended assessments, review detailed information, and choose the perfect fit for your organization.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-6"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Ready to Find Your Ideal Assessment?
            </motion.h2>
            
            <motion.p 
              className="text-xl mb-8 text-gray-600"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Start the questionnaire now and discover the perfect SHL assessment for your organization's needs in minutes.
            </motion.p>
            
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/questionnaire">
                <Button variant="primary" size="lg">
                  Start Questionnaire
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;