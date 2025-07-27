// src/pages/RegisterPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Accept formData and setFormData as props
const RegisterPage = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  // Handle changes to form fields, updating the centralized formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1️⃣ Register user
    const registerResponse = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.name, // mapped to Django username
        email: formData.email,
        password: formData.password,
      }),
    });

    if (!registerResponse.ok) {
      const errorData = await registerResponse.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    // 2️⃣ Get JWT token
    const loginResponse = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.email, // ✅ Must be email here because your serializer expects it
        password: formData.password,
      }),
    });

    if (!loginResponse.ok) {
      const loginError = await loginResponse.json();
      console.error('Login failed:', loginError);
      throw new Error(loginError.detail || 'Login failed');
    }

    const loginData = await loginResponse.json();
    console.log('Token:', loginData);

    localStorage.setItem('access_token', loginData.access);
    localStorage.setItem('refresh_token', loginData.refresh);

    navigate('/goalselection');

  } catch (error) {
    console.error('Registration error:', error);
    alert(error.message || 'Registration failed. Please try again.');
  }
};



  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name" // Add name attribute
                value={formData.name} // Use formData.name
                onChange={handleChange} // Use handleChange
                className="mt-1 p-2 w-full border rounded-lg focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email" // Add name attribute
                value={formData.email} // Use formData.email
                onChange={handleChange} // Use handleChange
                className="mt-1 p-2 w-full border rounded-lg focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password" // Add name attribute
                value={formData.password} // Use formData.password
                onChange={handleChange} // Use handleChange
                className="mt-1 p-2 w-full border rounded-lg focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-800"
            >
              Next
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;