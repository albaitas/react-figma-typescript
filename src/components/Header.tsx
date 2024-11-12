import React from 'react';

export const Header: React.FC = () => (
  <>
    <header className='black-bar'></header>
    <div className='top'>
      <nav>
        <img src='/images/logo.svg' alt='Company Logo' className='logo' />
        <div className='nav-buttons'>
          <button className='primary-button'>Users</button>
          <button className='primary-button'>Sign up</button>
        </div>
      </nav>
    </div>
  </>
);
