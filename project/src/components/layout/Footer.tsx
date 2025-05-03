import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Facebook, Mail } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Logo color="white" />
              <span className="ml-2 text-xl font-bold">SHL Finder</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Finding the perfect SHL assessment for your organization's needs made simple.
            </p>
            <div className="flex mt-4 space-x-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/questionnaire" className="text-gray-400 hover:text-white transition-colors">Find Assessments</Link></li>
              <li><Link to="/catalogue" className="text-gray-400 hover:text-white transition-colors">Assessment Catalogue</Link></li>
              <li><Link to="/compare" className="text-gray-400 hover:text-white transition-colors">Compare Assessments</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About SHL</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Contact Us</h3>
            <p className="text-gray-400 mb-2">Have questions? Reach out!</p>
            <Link to="/contact" className="btn btn-accent px-4 py-2">Contact Us</Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p>© {currentYear} SHL Assessment Finder. All rights reserved.</p>
            <div className="mt-4 md:mt-0 space-x-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;