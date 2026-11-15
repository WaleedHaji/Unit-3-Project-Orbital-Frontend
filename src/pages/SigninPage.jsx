// src/components/SignInForm/SignInForm.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../services/authService';


const SignInForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  function handleChange(event){
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event){
    event.preventDefault();
    try {
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to sign in. Please try again.');
    }
  };

 return (
    <main className="signin-page">
        <h1 className="signin-title">Sign In</h1>

        <p className="signin-error error">{error}</p>

        <form className="signin-form" autoComplete="off" onSubmit={handleSubmit}>
            <div className="signin-field">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    autoComplete="off"
                    id="username"
                    className="signin-input"
                    value={formData.username}
                    name="username"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="signin-field">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    autoComplete="off"
                    id="password"
                    className="signin-input"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="signin-buttons">
                <button type="submit" className="signin-submit">Sign In</button>
            </div>
            <p className="signin-signup">
  Don't have an account?{' '}
  <span onClick={() => navigate('/sign-up')}>
    Sign Up
  </span>
</p>
            
        </form>
    </main>
);
};

export default SignInForm;
