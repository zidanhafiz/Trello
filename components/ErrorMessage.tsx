import { ReactNode } from 'react';

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className='p-4 bg-[#FFF5F5] border-2 border-[#FBDFDF] rounded-md text-slate-500 font-medium'>
      <p>{children}</p>
    </div>
  );
};

export default ErrorMessage;
