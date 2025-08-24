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
import ExpertLogin from './components/ExpertLogin'; // New import for expert login
import ExpertDashboard from './components/ExpertDashboard'; // New import for expert dashboard
import ExpertRegister from './components/ExpertRegister'; // New import for expert register
import Recommendation from './pages/Recommendation';
import Resources from './pages/Resources';
function App() {
  // Centralized form data state
  const [formData, setFormData] = useState({
    education: 'Matric',
    experience: '',
    goals: '',
    interestedInLearning: 'Yes',
  });

  // State for expert token (separate from user form data)
  const [expertToken, setExpertToken] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Your existing routes - unchanged */}
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
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/resources" element={<Resources />} />
        <Route
          path="/userInformation"
          element={
            <UserInformation
              formData={formData}
              setFormData={setFormData}
            />
          }
        />
        {/* New expert-specific routes - added at the end */}
        <Route
          path="/experts/login"
          element={<ExpertLogin setToken={setExpertToken} />}
        />
        <Route
          path="/experts/dashboard"
          element={
            expertToken ? <ExpertDashboard /> : <ExpertLogin setToken={setExpertToken} />
          }
        />
         <Route
                    path="/experts/register"
                    element={<ExpertRegister />}
                />
      </Routes>
    </Router>
  );
}

export default App;