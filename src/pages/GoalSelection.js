// src/pages/GoalSelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const GoalSelection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('formData');
    return saved ? JSON.parse(saved) : {};
  });
  const [currentStep, setCurrentStep] = useState(2);

  const interests = ['Web Development', 'Artificial Intelligence', 'Data Science', 'Machine Learning'];

  const handleNext = async () => {
    if (!formData.interest) return;

    try {
      const token = localStorage.getItem('access_token');
      await fetch('http://127.0.0.1:8000/api/save-interest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ interest: formData.interest }),
      });
    } catch (error) {
      console.error('Network error, continuing anyway...');
    }

    // Save updated formData
    localStorage.setItem('formData', JSON.stringify(formData));

    setCurrentStep(currentStep + 1);
    navigate('/UserInformation');
  };

  const handleInterestSelect = (interest) => {
    const updated = { ...formData, interest };
    setFormData(updated);
    localStorage.setItem('formData', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <img src={logo} alt="Logo" className="h-10" />
            <span className="text-sm font-medium text-gray-500">Step-{currentStep}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(currentStep / 3) * 100}%` }} />
          </div>
        </div>

        <h2 className="text-lg font-medium text-gray-800 mb-2">Choose your interest</h2>
        <p className="text-gray-600 mb-4">Please choose a tech field from the given options</p>

        <div className="space-y-3">
          {interests.map((interest) => (
            <div
              key={interest}
              onClick={() => handleInterestSelect(interest)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.interest === interest ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                    formData.interest === interest ? 'bg-blue-500' : 'border-gray-300'
                  }`}
                >
                  {formData.interest === interest && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span>{interest}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/register')}
            className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            &lt; Back
          </button>

          <button
            onClick={handleNext}
            disabled={!formData.interest}
            className={`px-4 py-2 rounded-md text-white ${
              formData.interest ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalSelection;
