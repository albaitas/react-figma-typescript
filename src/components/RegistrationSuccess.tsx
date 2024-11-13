import React from 'react';

const RegistrationSuccess: React.FC = () => {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='modal-title'>User successfully registered</div>
        <img src='/images/success.svg' alt='Registration success illustration' className='success-image' />
      </div>
    </div>
  );
};

export default RegistrationSuccess;
