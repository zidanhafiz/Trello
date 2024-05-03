import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const Heading = ({
  children,
  size,
  className,
}: {
  children: ReactNode;
  size: 'md' | 'lg';
  className?: string;
}) => {
  const styles =
    size === 'md' ? 'font-semibold text-[18px] mb-6' : 'font-semibold text-[24px] mb-9';
  return <h1 className={cn(styles, className)}>{children}</h1>;
};

export default Heading;
