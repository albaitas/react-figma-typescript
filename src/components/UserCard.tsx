import React from 'react';

type UserCardProps = {
  avatar: string;
  name: string;
  position: string;
  email: string;
  phone: string;
};

export const UserCard: React.FC<UserCardProps> = ({ avatar, name, position, email, phone }) => (
  <article className='user-card'>
    <img src={avatar} alt={`${name}'s avatar`} className='user-avatar' />
    <div className='user-name' data-tooltip={name}>
      {name}
    </div>
    <div className='user-details'>
      <p>{position}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
  </article>
);
