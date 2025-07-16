// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/'); // Not logged in
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error('Unauthorized');
          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error);
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
    </div>
  );
};

export default Dashboard;
