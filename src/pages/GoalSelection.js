// src/pages/GoalSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

// Accept formData and setFormData as props
const GoalSelection = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  // Remove local formData state and localStorage initialization
  // const [formData, setFormData] = useState(() => {
  //   const saved = localStorage.getItem('formData');
  //   return saved ? JSON.parse(saved) : {};
  // });
  const [currentStep, setCurrentStep] = React.useState(2); // Keep if needed for local step tracking

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
        // Use formData.interest from the centralized state
        body: JSON.stringify({ interest: formData.interest }),
      });
    } catch (error) {
      console.error('Network error, continuing anyway...');
    }

    // Remove saving updated formData to localStorage here
    // localStorage.setItem('formData', JSON.stringify(formData));

    setCurrentStep(currentStep + 1);
    navigate('/UserInformation');
  };

  const handleInterestSelect = (interest) => {
    // Update the centralized formData via setFormData prop
    setFormData((prev) => ({
      ...prev,
      interest: interest, // Update the 'interest' field in formData
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img src={logo} alt="Logo" className="mb-6 w-24" />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Select Your Goal</h2>

        <div className="grid grid-cols-1 gap-4">
          {interests.map((interest) => (
            <div
              key={interest}
              className={`p-4 border rounded-md cursor-pointer flex items-center justify-between
                ${formData.interest === interest ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                hover:shadow-lg transition duration-200 ease-in-out`}
              onClick={() => handleInterestSelect(interest)}
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