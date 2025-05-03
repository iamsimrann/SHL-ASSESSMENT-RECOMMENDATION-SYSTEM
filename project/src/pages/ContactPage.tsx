import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import Button from '../components/ui/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    assessmentInterest: '',
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">Contact Us</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have questions about SHL assessments? Reach out to our team for personalized assistance with selecting the right assessments for your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h2 className="text-xl font-semibold mb-6 text-primary-600">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-primary-100 p-3 rounded-full text-primary-600 mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600 mt-1">assessments@shl.com</p>
                    <p className="text-gray-600">support@shl.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-primary-100 p-3 rounded-full text-primary-600 mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600 mt-1">+1 (800) 555-7890</p>
                    <p className="text-gray-600">+44 20 1234 5678</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-primary-100 p-3 rounded-full text-primary-600 mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-gray-600 mt-1">
                      1 SHL Plaza, 100 Main Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-3">Office Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9am - 6pm EST</p>
                <p className="text-gray-600">Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {formSubmitted ? (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-success-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-success-600">Message Sent!</h2>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Thank you for reaching out. Our team will get back to you within 1-2 business days.
                  </p>
                  <Button 
                    variant="primary" 
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-6 text-primary-600">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="input"
                          placeholder="John Smith"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="input"
                          placeholder="john@company.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="company">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="input"
                          placeholder="Your Company Inc."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="assessmentInterest">
                          Interested in which assessment?
                        </label>
                        <select
                          id="assessmentInterest"
                          name="assessmentInterest"
                          value={formData.assessmentInterest}
                          onChange={handleChange}
                          className="select px-3 py-2"
                        >
                          <option value="">Select an assessment (optional)</option>
                          <option value="Cognitive Ability">SHL Verify General Ability</option>
                          <option value="Personality & Behavior">SHL Occupational Personality Questionnaire</option>
                          <option value="Leadership">SHL Leadership Impact Assessment</option>
                          <option value="Technical Skills">SHL Coding Pro Assessment</option>
                          <option value="Situational Judgment">SHL Situational Judgement Test</option>
                          <option value="Multiple assessments">Multiple assessments</option>
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                          Your Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="input"
                          placeholder="Please let us know how we can help you..."
                        ></textarea>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full md:w-auto"
                      isLoading={isSubmitting}
                      icon={<Send size={16} />}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3 text-primary-600">How quickly can we implement SHL assessments?</h3>
              <p className="text-gray-600">
                Most SHL assessments can be implemented within 1-2 business days after contract signing. Our team will guide you through the setup process and provide training for your HR team.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3 text-primary-600">Are SHL assessments available in multiple languages?</h3>
              <p className="text-gray-600">
                Yes, most SHL assessments are available in 30+ languages. We can discuss specific language requirements for your organization during the consultation.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3 text-primary-600">How are SHL assessments priced?</h3>
              <p className="text-gray-600">
                Pricing depends on the specific assessments you choose, volume requirements, and contract length. We offer flexible options to meet different budget needs, including pay-per-use and subscription models.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3 text-primary-600">Can we integrate SHL assessments with our ATS?</h3>
              <p className="text-gray-600">
                SHL offers integrations with most major applicant tracking systems (ATS) including Workday, Taleo, SuccessFactors, and many others. Our technical team can discuss specific integration requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;