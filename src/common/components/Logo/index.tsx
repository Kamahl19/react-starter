import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

type Props = {
  to: string;
};

const Logo = ({ to }: Props) => (
  <Link to={to}>
    <div className="flex gap-2">
      <Rocket className="size-6" />
      <span className="font-medium">React Starter</span>
    </div>
  </Link>
);

export default Logo;
