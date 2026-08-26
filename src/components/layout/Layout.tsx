import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingContact } from './FloatingContact';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-studio-950 text-studio-200 selection:bg-champagne-500/20 selection:text-champagne-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-20" role="main">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp / Quick Contact */}
      <FloatingContact />
    </div>
  );
};
