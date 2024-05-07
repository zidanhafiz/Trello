import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: 'Trello %s',
    default: 'Trello',
  },
  description: 'Fullstack test internship',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.className)}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
          forcedTheme='light'
          disableTransitionOnChange
        >
          <header>
            <Navbar />
          </header>
          <main className='py-8 px-4 max-w-lg mx-auto'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
