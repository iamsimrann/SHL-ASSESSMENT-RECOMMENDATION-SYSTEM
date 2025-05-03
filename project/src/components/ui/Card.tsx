import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card = ({ 
  children, 
  className = '', 
  onClick, 
  hoverable = false 
}: CardProps) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md overflow-hidden 
        ${hoverable ? 'hover:shadow-lg transition-shadow duration-300' : ''} 
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`p-4 border-b border-gray-100 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`p-4 border-t border-gray-100 bg-gray-50 ${className}`}>
    {children}
  </div>
);

export default Card;