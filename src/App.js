// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MultiStepWrapper from './components/MultiStepWrapper';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import SkillAssessment from './pages/SkillAssessment';
import Roadmap from './pages/Roadmap';
import ExpertReview from './pages/ExpertReview';
import Gamification from './pages/Gamification';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import UserInformation from './pages/UserInformation';

function App() {
  // Centralized form data state
  const [formData, setFormData] = useState({
    education: 'Matrix',
    experience: '',
    goals: '',
    interestedInLearning: 'Yes',
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
<Route path="/*" element={<MultiStepWrapper />} />
        <Route path="/assessment" element={<SkillAssessment />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/expert-review" element={<ExpertReview />} />
        <Route path="/gamification" element={<Gamification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />

        {/* Corrected: removed the extra closing parenthesis */}
        <Route
          path="/userInformation"
          element={
            <UserInformation
              formData={formData}
              setFormData={setFormData}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;