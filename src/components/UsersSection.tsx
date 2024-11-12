import React from 'react';
import { UserCard } from './UserCard';

type User = {
  avatar: string;
  name: string;
  position: string;
  email: string;
  phone: string;
};

const users: User[] = [
  {
    avatar: './images/ellipse1.png',
    name: 'Salvador Stewart Flynn Thomas Salva Salvedor',
    position: 'Leading specialist of the departament of center',
    email: 'frontent_developer@gmail.com',
    phone: '+38 (098) 278 76 24'
  },
  {
    avatar: './images/ellipse2.png',
    name: 'Takamaru Ayako Jurrien',
    position: 'Lead Independent Director',
    email: 'Takamuru@gmail.com',
    phone: '+38 (098) 278 60 24'
  },
  {
    avatar: './images/ellipse3.png',
    name: 'Ilya',
    position: 'Co-Founder and CEO',
    email: 'Ilya_founder@gmail.com',
    phone: '+38 (098) 2356 44 24'
  },
  {
    avatar: './images/ellipse4.png',
    name: 'Alexandre',
    position: 'Lead Independent Director',
    email: 'Alexandr_develop@gmail.com',
    phone: '+38 (098) 198 44 24'
  },
  {
    avatar: './images/ellipse5.png',
    name: 'Winny',
    position: 'Former Senior Director',
    email: 'Winny_develop@gmail.com',
    phone: '+38 (098) 278 22 88'
  },
  {
    avatar: './images/ellipse6.png',
    name: 'Simon',
    position: 'President of Commerce',
    email: 'Simon@gmail.com',
    phone: '+38 (098) 278 44 00'
  }
];

export const UsersSection: React.FC = () => (
  <section className='users-section'>
    <h1>Working with GET request</h1>
    <div className='users-grid'>
      {users.map((user, index) => (
        <UserCard key={index} {...user} />
      ))}
    </div>
    <button className='primary-button'>Show more</button>
  </section>
);
