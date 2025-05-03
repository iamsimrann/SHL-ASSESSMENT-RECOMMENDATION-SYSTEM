import { Circle as CircleNotch } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner = ({ size = 'medium', className = '' }: LoadingSpinnerProps) => {
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
  };

  return (
    <div className={`animate-spin ${className}`}>
      <CircleNotch size={sizeMap[size]} className="text-primary-500" />
    </div>
  );
};

export default LoadingSpinner;