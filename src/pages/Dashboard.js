<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
=======
// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
>>>>>>> Stashed changes

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
<<<<<<< Updated upstream
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/');
=======

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/'); // Not logged in
>>>>>>> Stashed changes
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile/', {
<<<<<<< Updated upstream
          headers: { Authorization: `Bearer ${token}` },
        });
=======
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

>>>>>>> Stashed changes
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
<<<<<<< Updated upstream
          navigate('/');
        }
      } catch (err) {
        console.error(err);
=======
          console.error('Unauthorized');
          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error);
>>>>>>> Stashed changes
        navigate('/');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

<<<<<<< Updated upstream
  if (!profile) return <p>Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-72 bg-white border-r flex flex-col justify-between">
        <div>
          <div className="p-6 flex items-center justify-center border-b">
            <img src={logo} alt="TechQuestMentor Logo" className="h-14 object-contain" />
          </div>

          <nav className="flex flex-col p-6 space-y-4">
            {['dashboard', 'profile', 'update', 'expert'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full py-2 rounded text-left px-4 font-medium ${
                  activeTab === tab
                    ? 'bg-[#0c5ec9] text-white'
                    : 'text-[#0c5ec9] hover:bg-black hover:text-white'
                }`}
              >
                {tab === 'dashboard' && 'Dashboard'}
                {tab === 'profile' && 'Profile Info'}
                {tab === 'update' && 'Update Profile'}
                {tab === 'expert' && 'Expert View'}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="m-6 py-2 px-4 bg-[#0c5ec9] text-white rounded hover:bg-black"
        >
          Logout
        </button>
      </aside>

      <div className="flex-grow flex flex-col">
        <header className="bg-white shadow p-4 flex justify-end items-center">
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold">{profile.username}</p>
              <p className="text-sm text-gray-600">{profile.email}</p>
            </div>
            <div className="w-10 h-10 bg-[#0c5ec9] text-white flex items-center justify-center rounded-full text-lg font-bold">
              {profile.username[0].toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-grow p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Skill Assessment</h3>
                  {profile.assessment_done ? (
                    <p className="text-gray-600 mb-4">
                      ✅ You have already done your assessment for <strong>{profile.interest}</strong>.<br />
                      Your level is <strong>{profile.assessment_level}</strong>.
                    </p>
                  ) : (
                    <p className="text-gray-600 mb-4">
                      Evaluate your current skills and get recommendations.
                    </p>
                  )}
                </div>
                {profile.assessment_done ? (
                  <button disabled className="inline-block px-4 py-2 bg-gray-400 text-white rounded">
                    Assessment Completed
                  </button>
                ) : (
                  <Link
                    to="/assessment"
                    className="inline-block px-4 py-2 bg-[#0c5ec9] text-white rounded hover:bg-black"
                  >
                    Take Assessment
                  </Link>
                )}
              </div>

              <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Career Goals</h3>
                  <p className="text-gray-600 mb-4">Set or update your career objectives.</p>
                </div>
                <Link
                  to="/goals"
                  className="inline-block px-4 py-2 bg-[#0c5ec9] text-white rounded hover:bg-black"
                >
                  Go to Goals
                </Link>
              </div>

              <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Roadmap</h3>
                  <p className="text-gray-600 mb-4">View your personalized career path.</p>
                </div>
                <Link
                  to="/roadmap"
                  className="inline-block px-4 py-2 bg-[#0c5ec9] text-white rounded hover:bg-black"
                >
                  View Roadmap
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
              <p><strong>Username:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Education:</strong> {profile.education}</p>
              <p><strong>Experience:</strong> {profile.experience}</p>
              <p><strong>Goals:</strong> {profile.goals}</p>
              <p><strong>Interest:</strong> {profile.interest}</p>
            </div>
          )}
        </main>
      </div>
=======
  if (!profile) {
    return <p className="text-center mt-12">Loading...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto py-12 flex-grow">
        <div className="flex justify-between mb-4">
          <h2 className="text-3xl font-bold text-primary">Welcome, {profile.username}!</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="mb-8 p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Profile Info</h3>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Education:</strong> {profile.education}</p>
          <p><strong>Experience:</strong> {profile.experience}</p>
          <p><strong>Goals:</strong> {profile.goals}</p>
          <p><strong>Interest:</strong> {profile.interest}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-primary mb-2">Career Goals</h3>
            <p className="text-gray-600 mb-4">Set or update your career objectives.</p>
            <Link
              to="/goals"
              className="inline-block px-4 py-2 bg-secondary text-black rounded-lg hover:bg-yellow-300"
            >
              Go to Goals
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-primary mb-2">Skill Assessment</h3>
            <p className="text-gray-600 mb-4">Evaluate your current skills.</p>
            <Link
              to="/assessment"
              className="inline-block px-4 py-2 bg-secondary text-black rounded-lg hover:bg-yellow-300"
            >
              Take Assessment
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-primary mb-2">Roadmap</h3>
            <p className="text-gray-600 mb-4">View your personalized career path.</p>
            <Link
              to="/roadmap"
              className="inline-block px-4 py-2 bg-secondary text-black rounded-lg hover:bg-yellow-300"
            >
              View Roadmap
            </Link>
          </div>
        </div>
      </main>
      <Footer />
>>>>>>> Stashed changes
    </div>
  );
};

export default Dashboard;
