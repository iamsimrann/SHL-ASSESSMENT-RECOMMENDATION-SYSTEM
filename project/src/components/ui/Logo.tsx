import { Lightbulb } from 'lucide-react';

interface LogoProps {
  color?: string;
}

const Logo = ({ color = 'currentColor' }: LogoProps) => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white">
      <Lightbulb size={20} color={color} />
    </div>
  );
};

export default Logo;