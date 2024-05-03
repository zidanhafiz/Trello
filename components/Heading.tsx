import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const Heading = ({ children, size }: { children: ReactNode; size: 'md' | 'lg' }) => {
  const className =
    size === 'md' ? 'font-semibold text-[18px] mb-6' : 'font-semibold text-[18px] mb-6';
  return <h1 className={cn(className)}>{children}</h1>;
};

export default Heading;
