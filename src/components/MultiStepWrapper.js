// src/pages/MultiStepWrapper.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import UserInformation from '../pages/UserInformation';
import GoalSelection from '../pages/GoalSelection';

const MultiStepWrapper = () => {
  // This is the centralized formData state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    interest: '',
    education: '', // Added for UserInformation
    experience: '', // Added for UserInformation
    goals: '', // Added for UserInformation
    interestedInLearning: true, // Added for UserInformation, ensure consistent initial value
  });

  return (
    <Routes>
      <Route path="/register" element={<RegisterPage formData={formData} setFormData={setFormData} />} />
      <Route path="/goalselection" element={<GoalSelection formData={formData} setFormData={setFormData} />} />
      <Route path="/UserInformation" element={<UserInformation formData={formData} setFormData={setFormData} />} />
    </Routes>
  );
};

export default MultiStepWrapper;