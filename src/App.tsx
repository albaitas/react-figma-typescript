import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RegistrationForm } from './components/RegistrationForm';
import { UsersSection } from './components/UsersSection';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <UsersSection />
        <RegistrationForm />
      </main>
    </>
  );
};

export default App;
