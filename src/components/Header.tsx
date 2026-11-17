import React from 'react';
import { TopContactBar } from './TopContactBar';
import { Navbar } from './Navbar';

export const Header: React.FC = () => {
  return (
    <header className="w-full flex flex-col z-50">
      <TopContactBar />
      <Navbar />
    </header>
  );
};
