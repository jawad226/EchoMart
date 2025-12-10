import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import ConditionalLayout from './components/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: { 
    template: '%s | ElectroMart',
    default: 'ElectroMart',
  },
  description: 'Your one-stop shop for all electronics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}