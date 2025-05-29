import React from 'react';
import logo from '../assets/logo.png';  // adjust path accordingly

import { useNavigate } from 'react-router-dom'; // 👈 Step 1

const UserInformation = ({ formData, setFormData, next }) => {
  const navigate = useNavigate(); // 👈 Step 2

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/save-user-info/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }

      next();

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was a problem submitting your data. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
<img src={logo} alt="TechQuest Mentor Logo" className="h-12" />
      </div>

      <div className="flex border-b mb-6">
  <button className="px-4 py-2 font-medium text-gray-500" type="button" onClick={() => navigate('/register')}>
    General
  </button>
  <button className="px-4 py-2 font-medium text-gray-500" type="button" onClick={() => navigate('/goalselection')}>
    Interests
  </button>
  <button className="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600" type="button">
    User Information
  </button>
</div>


      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tell us something about yourself</h2>
          <p className="text-gray-500 text-sm mb-6">This information helps for better suggestions for your career</p>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="education">
              What is your highest education?
            </label>
            <select
              id="education"
              name="education"
              value={formData.education || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select your education</option>
              <option value="Matrix">Matrix</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="experience">
              Any previous experience? e.g. HTML, CSS, PHP, JS etc...
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your experience"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="goals">
              What are your long-term career goals? e.g. Full stack Engineer, Data Scientist etc...
            </label>
            <input
              type="text"
              id="goals"
              name="goals"
              value={formData.goals || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your career goals"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Are you interested in learning new technologies?
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="interestedInLearning"
                  value="Yes"
                  checked={formData.interestedInLearning === 'Yes'}
                  onChange={handleChange}
                  className="text-blue-600 focus:ring-blue-500"
                  required
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="interestedInLearning"
                  value="No"
                  checked={formData.interestedInLearning === 'No'}
                  onChange={handleChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            onClick={() => navigate('/goalselection')} // 👈 Step 3
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInformation;
