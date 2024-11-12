import React from 'react';

export const Hero: React.FC = () => (
  <section className='hero-section'>
    <img src='./images/hero.jpg' alt='Hero background' className='hero-background' />
    <div className='hero-content'>
      <div className='hero-title'>Test assignment for front-end developer</div>
      <p className='hero-description'>
        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web
        interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
      </p>
      <button className='primary-button'>Sign up</button>
    </div>
  </section>
);
