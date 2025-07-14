// src/pages/MultiStepWrapper.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import UserInformation from '../pages/UserInformation';
import GoalSelection from '../pages/GoalSelection';

const MultiStepWrapper = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    interest: '',
    // add more as needed
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
