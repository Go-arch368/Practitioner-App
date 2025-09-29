import Header from './Header';
import Footer from './Footer';
import React from 'react';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <div className="main-header">
        <Header />
      </div>
      <div className="main-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}
