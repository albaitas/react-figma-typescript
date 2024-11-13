import React, { useState, useMemo, ChangeEvent, FormEvent } from 'react';
import Preloader from './Preloader';
import RegistrationSuccess from './RegistrationSuccess';

interface Inputs {
  name: string;
  email: string;
  phone: string;
  position: string;
}

interface Errors {
  [key: string]: string;
}

export const RegistrationForm: React.FC = () => {
  const [inputs, setInputs] = useState<Inputs>({ name: '', email: '', phone: '', position: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (value.trim() === '' || value.toLowerCase() === 'item') return 'Please enter a valid name';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        break;
      case 'phone':
        if (!/^\+?\d{10,15}$/.test(value)) return 'Please enter a valid phone number';
        break;
      case 'position':
        if (value.trim() === '') return 'Please select a position';
        break;
      default:
        return '';
    }
    return '';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      const selectedFile = files[0];
      if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
        setFileError('File size must be less than 2MB');
        setFile(null);
      } else {
        setFile(selectedFile);
        setFileError('');
      }
    } else {
      setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value) }));
    }
  };

  const isFormValid = useMemo(
    () => Object.values(inputs).every((value) => value.trim() !== '') && Object.values(errors).every((error) => error === '') && file !== null,
    [inputs, errors, file]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors: Errors = {};
    Object.keys(inputs).forEach((name) => {
      const error = validateField(name, inputs[name as keyof Inputs]);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0 || !file) {
      if (!file) setFileError('Please upload a photo');
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', inputs.name);
      formData.append('email', inputs.email);
      formData.append('phone', inputs.phone);
      formData.append('position', inputs.position);
      if (file) formData.append('photo', file);

      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to submit form');
      const data = await response.json();

      setInputs({ name: '', email: '', phone: '', position: '' });
      setErrors({});
      setFile(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      console.log('Server ok:', data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='registration-section'>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {showSuccess && <RegistrationSuccess />}
          <h1>Working with POST request</h1>
          <form className='forma' onSubmit={handleSubmit}>
            <div className='input-container'>
              <input
                type='text'
                id='name'
                placeholder='Your name'
                name='name'
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                value={inputs.name}
                onChange={handleChange}
              />
              <label htmlFor='name' className='floating-label'>
                Your name
              </label>
              {errors.name && <p className='error-text'>{errors.name}</p>}
            </div>

            <div className='input-container'>
              <input
                type='email'
                id='email'
                placeholder='Email'
                name='email'
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                value={inputs.email}
                onChange={handleChange}
              />
              <label htmlFor='email' className='floating-label'>
                Email
              </label>
              <p className='error-text'>{errors.email}</p>
            </div>

            <div className='input-container'>
              <input
                type='tel'
                id='phone'
                placeholder='Phone'
                name='phone'
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
                value={inputs.phone}
                onChange={handleChange}
              />
              <label htmlFor='phone' className='floating-label'>
                Phone
              </label>
              <p className='error-text'>{errors.phone}</p>
            </div>

            <fieldset className='radio-group'>
              <legend>Select your position</legend>
              {['Frontend developer', 'Backend developer', 'Designer', 'QA'].map((position, index) => (
                <div key={index} className='radio-option'>
                  <input type='radio' id={`position-${index}`} name='position' value={position} checked={inputs.position === position} onChange={handleChange} />
                  <label htmlFor={`position-${index}`}>{position}</label>
                </div>
              ))}
              <p className='error-text'>{errors.position}</p>
            </fieldset>

            <div className='upload-section'>
              <label htmlFor='photo' className={`upload-button ${fileError ? 'input-error-upload' : ''}`}>
                Upload
              </label>
              <input id='photo' type='file' accept='image/*' onChange={handleChange} />
              <span className={`file-status-text ${fileError ? 'input-error' : ''}`}>{file ? file.name : 'Upload your photo'}</span>
              <p className='error-text-file'>{fileError}</p>
            </div>

            <button type='submit' className={`primary-button ${!isFormValid ? 'disabled' : ''}`}>
              Sign up
            </button>
          </form>
        </>
      )}
    </section>
  );
};
