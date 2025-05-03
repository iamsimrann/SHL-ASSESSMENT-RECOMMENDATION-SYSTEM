import { Assessment, AssessmentCategory, AssessmentFormat } from '../types';

// Mock data for SHL assessments
export const assessments: Assessment[] = [
  {
    id: 'cog-ability-001',
    name: 'SHL Verify General Ability',
    category: 'Cognitive Ability',
    description: 'Comprehensive assessment of verbal, numerical, and logical reasoning abilities to predict job performance across a wide range of roles. This assessment measures core cognitive abilities essential for problem-solving, decision-making, and learning new information quickly in professional environments.',
    shortDescription: 'Measures verbal, numerical, and logical reasoning abilities for general job performance prediction.',
    benefits: [
      'Accurately predicts job performance across roles',
      'Reduces hiring bias with objective data',
      'Identifies high-potential candidates quickly',
      'Correlates strongly with future job success',
      'Validated across industries and roles'
    ],
    features: [
      'Three core assessments in one package',
      'Adjustable difficulty levels',
      'Randomized question bank',
      'Available in 40+ languages',
      'Detailed score reports with normative comparisons'
    ],
    targetRoles: [
      'Entry-level positions',
      'Professional roles',
      'Management positions',
      'Graduate recruitment',
      'High-volume hiring'
    ],
    skillsAssessed: [
      'Verbal reasoning',
      'Numerical reasoning',
      'Logical reasoning',
      'Problem-solving',
      'Critical thinking'
    ],
    duration: 45,
    format: 'Multiple Choice',
    difficulty: 'intermediate',
    popularity: 9,
    thumbnailUrl: 'https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    validatedFor: ['All industries', 'Global usage', 'Multiple job levels']
  },
  {
    id: 'pers-behav-001',
    name: 'SHL Occupational Personality Questionnaire (OPQ)',
    category: 'Personality & Behavior',
    description: 'In-depth personality assessment measuring 32 workplace characteristics to predict job-relevant behaviors and culture fit. The OPQ provides detailed insights into how individuals prefer to work, their interpersonal style, and their approach to feelings and emotions in workplace contexts.',
    shortDescription: 'Measures 32 personality characteristics to predict workplace behaviors and culture fit.',
    benefits: [
      'Deep insights into workplace behavior',
      'Predicts cultural fit and team dynamics',
      'Reduces turnover by improving matches',
      'Supports development planning',
      'Enables team composition analysis'
    ],
    features: [
      'Ipsative forced-choice format reduces bias',
      'Optimized for workplace contexts',
      'Detailed reports for selection and development',
      'Team and leadership insights',
      'Available in 30+ languages'
    ],
    targetRoles: [
      'Mid to senior-level positions',
      'Leadership roles',
      'Team-focused positions',
      'Customer-facing roles',
      'Professional services'
    ],
    skillsAssessed: [
      'Relationships with people',
      'Thinking style',
      'Feelings and emotions',
      'Work style preferences',
      'Interpersonal dynamics'
    ],
    duration: 35,
    format: 'Questionnaire',
    difficulty: 'intermediate',
    popularity: 8,
    thumbnailUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    validatedFor: ['All industries', 'Global usage', 'Mid to senior levels']
  },
  {
    id: 'lead-001',
    name: 'SHL Leadership Impact Assessment',
    category: 'Leadership',
    description: 'Comprehensive leadership assessment designed to identify and develop future leaders. Evaluates leadership potential across multiple dimensions and provides detailed reports for selection and development purposes. Measures both leadership behaviors and the impact they have on teams and organizational outcomes.',
    shortDescription: 'Evaluates leadership potential across key dimensions for selection and development.',
    benefits: [
      'Identifies high-potential leaders',
      'Reduces leadership selection risks',
      'Accelerates leadership development',
      'Aligns leadership style to organization needs',
      'Improves succession planning processes'
    ],
    features: [
      'Multiple assessment methods combined',
      'Situational judgment scenarios',
      'Self-assessment and 360° options',
      'Development planning tools included',
      'Benchmarking against successful leaders'
    ],
    targetRoles: [
      'Executive leadership',
      'Senior management',
      'High-potential employees',
      'Management development programs',
      'Succession planning candidates'
    ],
    skillsAssessed: [
      'Strategic thinking',
      'People leadership',
      'Change management',
      'Decision making',
      'Innovation and vision',
      'Emotional intelligence'
    ],
    duration: 60,
    format: 'Interactive Scenario',
    difficulty: 'advanced',
    popularity: 7,
    thumbnailUrl: 'https://images.pexels.com/photos/7648049/pexels-photo-7648049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    validatedFor: ['All industries', 'Global usage', 'Leadership positions']
  },
  {
    id: 'tech-001',
    name: 'SHL Coding Pro Assessment',
    category: 'Technical Skills',
    description: 'Real-world coding challenges to evaluate programming proficiency, problem-solving approach, and code quality. Assesses candidates in their preferred programming languages through practical tasks rather than theoretical knowledge, allowing a true evaluation of development capabilities in job-relevant contexts.',
    shortDescription: 'Evaluates programming skills through real-world coding challenges in multiple languages.',
    benefits: [
      'Validates actual coding ability',
      'Reduces technical hiring risks',
      'Streamlines developer screening',
      'Provides objective skills comparison',
      'Tests for both efficiency and best practices'
    ],
    features: [
      'Supports 30+ programming languages',
      'Real-world project scenarios',
      'Automated scoring and manual review options',
      'Anti-plagiarism protection',
      'Multiple difficulty levels'
    ],
    targetRoles: [
      'Software developers',
      'Web developers',
      'DevOps engineers',
      'QA engineers',
      'Technical leads'
    ],
    skillsAssessed: [
      'Programming proficiency',
      'Algorithm design',
      'Problem-solving',
      'Code quality and organization',
      'Technical documentation'
    ],
    duration: 90,
    format: 'Coding Challenge',
    difficulty: 'advanced',
    popularity: 8,
    thumbnailUrl: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    validatedFor: ['Technology', 'Financial services', 'E-commerce', 'Software development']
  },
  {
    id: 'sit-judg-001',
    name: 'SHL Situational Judgement Test',
    category: 'Situational Judgment',
    description: 'Scenario-based assessment measuring judgment and decision-making in workplace situations. Presents realistic work scenarios and evaluates how candidates would respond, providing insights into their problem-solving approaches, interpersonal skills, and alignment with organizational values and priorities.',
    shortDescription: 'Evaluates judgment and decision-making in realistic workplace scenarios.',
    benefits: [
      'Predicts on-the-job behaviors',
      'Assesses cultural and values fit',
      'Provides insight into judgment quality',
      'Measures practical intelligence',
      'Reduces training time for new hires'
    ],
    features: [
      'Customizable to specific roles',
      'Video-based scenario options',
      'Mobile-friendly delivery',
      'Role-specific scoring profiles',
      'Detailed feedback reports'
    ],
    targetRoles: [
      'Customer service',
      'Sales representatives',
      'Healthcare professionals',
      'Retail managers',
      'Entry to mid-level positions'
    ],
    skillsAssessed: [
      'Decision making',
      'Problem-solving',
      'Interpersonal effectiveness',
      'Conflict resolution',
      'Ethical judgment'
    ],
    duration: 30,
    format: 'Interactive Scenario',
    difficulty: 'intermediate',
    popularity: 9,
    thumbnailUrl: 'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    validatedFor: ['All industries', 'Global usage', 'Multiple job levels']
  },
  {
    id: 'emot-int-001',
    name: 'SHL Emotional Intelligence Assessment',
    category: 'Emotional Intelligence',
    description: 'Comprehensive assessment of emotional intelligence competencies in workplace contexts. Measures the ability to recognize, understand, and manage emotions in oneself and others, as well as how to use emotional information to guide thinking and behavior in professional situations.',
    shortDescription: 'Measures emotional intelligence competencies critical for workplace success.',
    benefits: [
      'Predicts interpersonal effectiveness',
      'Identifies emotional leadership potential',
      'Improves team collaboration',
      'Enhances customer service quality',
      'Supports conflict management skills'
    ],
    features: [
      'Self-assessment questionnaire',
      'Situational judgment scenarios',
      'Optional 360° feedback component',
      'Development planning tools',
      'Comparative benchmarking'
    ],
    targetRoles: [
      'Leadership positions',
      'Team leaders',
      'Customer-facing roles',
      'Human resources professionals',
      'Change management roles'
    ],
    skillsAssessed: [
      'Self-awareness',
      'Self-regulation',
      'Social awareness',
      'Relationship management',
      'Emotional reasoning'
    ],
    duration: 40,
    format: 'Questionnaire',
    difficulty: 'intermediate',
    popularity: 7,
    thumbnailUrl: 'https://images.pexels.com/photos/515169/pexels-photo-515169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    validatedFor: ['All industries', 'Global usage', 'Multiple job levels']
  },
  {
    id: 'cog-ability-002',
    name: 'SHL Inductive Reasoning Test',
    category: 'Cognitive Ability',
    description: 'Measures logical thinking and problem-solving abilities without requiring prior knowledge. Assesses how well candidates can identify patterns, relationships, and logical rules to solve novel problems, which is critical for roles requiring innovation and adaptation to new situations.',
    shortDescription: 'Assesses logical thinking and pattern recognition for problem-solving abilities.',
    benefits: [
      'Predicts success in roles requiring analytical thinking',
      'Identifies innovative problem-solvers',
      'Measures learning agility',
      'Language-neutral assessment option',
      'Strong predictor of job training success'
    ],
    features: [
      'Abstract pattern-based questions',
      'Increasing difficulty progression',
      'Non-verbal format',
      'Timed assessment',
      'Multiple parallel forms'
    ],
    targetRoles: [
      'Technical professionals',
      'Analysts',
      'Researchers',
      'Product development',
      'Strategic roles'
    ],
    skillsAssessed: [
      'Pattern recognition',
      'Abstract reasoning',
      'Problem-solving',
      'Creativity',
      'Learning agility'
    ],
    duration: 25,
    format: 'Multiple Choice',
    difficulty: 'advanced',
    popularity: 8,
    thumbnailUrl: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    validatedFor: ['All industries', 'Global usage', 'Professional to senior levels']
  },
  {
    id: 'mot-val-001',
    name: 'SHL Motivation Questionnaire',
    category: 'Motivation & Values',
    description: 'Identifies key motivational drivers and values that influence workplace behavior and satisfaction. This assessment helps organizations understand what energizes individuals at work, enabling better job matching, engagement strategies, and retention planning.',
    shortDescription: 'Measures what motivates individuals at work for better job matching and engagement.',
    benefits: [
      'Improves employee engagement',
      'Reduces unwanted turnover',
      'Enhances team motivation strategies',
      'Aligns rewards with individual drivers',
      'Supports career development planning'
    ],
    features: [
      'Measures 18 motivation factors',
      'Forced-choice format reduces bias',
      'Individual and team reports available',
      'Management guideline recommendations',
      'Integration with other SHL assessments'
    ],
    targetRoles: [
      'All job roles',
      'High-potential employees',
      'Sales teams',
      'Remote workers',
      'Project teams'
    ],
    skillsAssessed: [
      'Achievement orientation',
      'Power and control needs',
      'Affiliation interests',
      'Personal growth values',
      'Security and stability needs'
    ],
    duration: 30,
    format: 'Questionnaire',
    difficulty: 'beginner',
    popularity: 6,
    thumbnailUrl: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    validatedFor: ['All industries', 'Global usage', 'All job levels']
  },
  {
    id: 'sit-judg-002',
    name: 'SHL Customer Service Judgment',
    category: 'Situational Judgment',
    description: 'Assesses decision-making skills specifically in customer service scenarios. Presents realistic customer interactions and evaluates how candidates would handle challenging situations, providing insights into their customer orientation, problem-solving approach, and service quality.',
    shortDescription: 'Evaluates decision-making in realistic customer service scenarios.',
    benefits: [
      'Predicts customer service performance',
      'Reduces customer service training time',
      'Identifies natural service orientation',
      'Improves customer satisfaction',
      'Supports consistent service delivery'
    ],
    features: [
      'Industry-specific scenarios available',
      'Video-based scenario options',
      'Mobile-friendly assessment',
      'Multiple difficulty levels',
      'Customization options'
    ],
    targetRoles: [
      'Customer service representatives',
      'Call center agents',
      'Retail sales associates',
      'Technical support staff',
      'Service managers'
    ],
    skillsAssessed: [
      'Customer orientation',
      'Problem resolution',
      'Empathy',
      'Communication skills',
      'Conflict management'
    ],
    duration: 35,
    format: 'Interactive Scenario',
    difficulty: 'intermediate',
    popularity: 8,
    thumbnailUrl: 'https://images.pexels.com/photos/7709308/pexels-photo-7709308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    validatedFor: ['Retail', 'Healthcare', 'Financial services', 'Telecommunications', 'Hospitality']
  },
  {
    id: 'tech-002',
    name: 'SHL Digital Fluency Assessment',
    category: 'Technical Skills',
    description: 'Evaluates proficiency with digital tools, concepts, and processes essential for modern workplaces. Assesses candidates\' comfort with digital technologies, ability to adapt to new tools, and their understanding of digital concepts across various applications and platforms.',
    shortDescription: 'Assesses proficiency with digital tools and concepts for the modern workplace.',
    benefits: [
      'Identifies digitally adaptable talent',
      'Reduces digital transformation barriers',
      'Supports digital upskilling efforts',
      'Improves digital project team selection',
      'Enhances workforce digital readiness'
    ],
    features: [
      'Covers multiple digital domains',
      'Practical simulation elements',
      'Knowledge and application testing',
      'Digital mindset evaluation',
      'Customizable difficulty levels'
    ],
    targetRoles: [
      'Digital marketing professionals',
      'Business analysts',
      'Project managers',
      'Administrative roles',
      'Non-technical digital roles'
    ],
    skillsAssessed: [
      'Digital literacy',
      'Data interpretation',
      'Digital collaboration',
      'Information management',
      'Digital problem-solving'
    ],
    duration: 45,
    format: 'Simulation',
    difficulty: 'intermediate',
    popularity: 7,
    thumbnailUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    validatedFor: ['All industries', 'Global usage', 'Multiple job levels']
  }
];

// Export by category for easier access
export const getAssessmentsByCategory = (category: AssessmentCategory): Assessment[] => {
  return assessments.filter(assessment => assessment.category === category);
};

// Export by format
export const getAssessmentsByFormat = (format: AssessmentFormat): Assessment[] => {
  return assessments.filter(assessment => assessment.format === format);
};

// Get assessment by ID
export const getAssessmentById = (id: string): Assessment | undefined => {
  return assessments.find(assessment => assessment.id === id);
};

// Search assessments
export const searchAssessments = (query: string): Assessment[] => {
  const lowercaseQuery = query.toLowerCase();
  return assessments.filter(assessment => {
    return (
      assessment.name.toLowerCase().includes(lowercaseQuery) ||
      assessment.description.toLowerCase().includes(lowercaseQuery) ||
      assessment.category.toLowerCase().includes(lowercaseQuery) ||
      assessment.skillsAssessed.some(skill => skill.toLowerCase().includes(lowercaseQuery)) ||
      assessment.targetRoles.some(role => role.toLowerCase().includes(lowercaseQuery))
    );
  });
};