import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import your step components here:
import General from './General';
import Interests from './Interests';
import UserInformation from './UserInformation';
import Review from './Review'; // optional, final review step

const MultiStepForm = () => {
  const navigate = useNavigate();

  // Shared form data state across all steps
  const [formData, setFormData] = useState({
    // put initial values for all steps here
    name: '',
    email: '',
    education: 'Matrix',
    experience: '',
    goals: '',
    interestedInLearning: 'Yes',
    interests: [], // example array for Interests step
    // ... add more fields as needed
  });

  // Move to next step route
  const goNext = (path) => {
    navigate(path);
  };

  // Move to previous step route
  const goBack = (path) => {
    navigate(path);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Routes>
        <Route
          path="/"
          element={
            <General
              formData={formData}
              setFormData={setFormData}
              next={() => goNext('/interests')}
            />
          }
        />
        <Route
          path="/interests"
          element={
            <Interests
              formData={formData}
              setFormData={setFormData}
              next={() => goNext('/user-info')}
              back={() => goBack('/')}
            />
          }
        />
        <Route
          path="/user-info"
          element={
            <UserInformation
              formData={formData}
              setFormData={setFormData}
              next={() => goNext('/review')}
              back={() => goBack('/interests')}
            />
          }
        />
        <Route
  path="/user-info"
  element={
    <UserInformation
      formData={formData}          // <--- Pass formData
      setFormData={setFormData}    // <--- Pass setFormData
      next={() => goNext('/review')}
      back={() => goBack('/interests')}
    />
  }
/>

        <Route
          path="/review"
          element={
            <Review
              formData={formData}
              back={() => goBack('/user-info')}
              // you can add submit handler here
            />
          }
        />
      </Routes>
    </div>
  );
};

export default MultiStepForm;
