// Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import CuriousBadge from '../assets/curious_badge.jpg';
import KeenBadge from '../assets/keen_researcher_badge.png';
import ProBadge from '../assets/resource_pro_badge.png';
import ExplorerBadge from '../assets/explorer_badge.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companies, setCompanies] = useState([]);
  const [badges, setBadges] = useState([]);
  const [resourceClicks, setResourceClicks] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const profileRes = await fetch('http://127.0.0.1:8000/api/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const companiesRes = await fetch('http://localhost:8000/api/recommended-software-houses/');
        const badgesRes = await fetch('http://localhost:8000/api/user-badges/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const clicksRes = await fetch('http://localhost:8000/api/resource-click-count/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (profileRes.ok) setProfile(await profileRes.json());
        if (companiesRes.ok) setCompanies((await companiesRes.json()).slice(0, 4));
        if (badgesRes.ok) setBadges(await badgesRes.json());
        if (clicksRes.ok) setResourceClicks((await clicksRes.json()).click_count);
      } catch (err) {
        console.error(err);
        navigate('/');
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const handleTabClick = (tab) => {
    if (tab === 'companies') navigate('/recommendation');
    else if (tab === 'resources') navigate('/resources');
    else if (tab === 'expert') navigate('/expert-review');
    else setActiveTab(tab);
  };

  const badgeLevels = [
    { name: 'Curious Learner', threshold: 5, image: CuriousBadge },
    { name: 'Keen Researcher', threshold: 10, image: KeenBadge },
    { name: 'Resource Pro', threshold: 15, image: ProBadge },
    { name: 'Explorer', threshold: 20, image: ExplorerBadge },
  ];

  const handleClaimBadge = async (badgeName) => {
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch('http://localhost:8000/api/claim-badge/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ badge_name: badgeName }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setBadges((prev) => [...prev, { name: badgeName, description: data.description || '' }]);
      } else {
        alert(data.error || 'Failed to claim badge');
      }
    } catch (err) {
      console.error(err);
      alert('Error claiming badge');
    }
  };

  const renderBadge = ({ name, threshold, image }) => {
    const alreadyClaimed = badges.some((b) => b.name === name);
    return (
      <div key={name} className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{name} Badge</h3>
        <p className="text-gray-600 mb-4">
          Earned after viewing {threshold}+ resources in a week.
        </p>
        {alreadyClaimed ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-4">🎉 You’ve earned this badge!</p>
            <img src={image} alt={name} className="w-20 h-20 mx-auto" />
            <p className="text-sm font-semibold mt-2 text-[#0c5ec9]">{name}</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              You’ve viewed <strong>{resourceClicks}</strong> resources this week.{' '}
              {resourceClicks >= threshold
                ? 'You are eligible!'
                : `View ${threshold - resourceClicks} more to earn it.`}
            </p>
            <button
              onClick={() => handleClaimBadge(name)}
              disabled={resourceClicks < threshold}
              className={`inline-block px-4 py-2 rounded text-white ${
                resourceClicks >= threshold ? 'bg-[#0c5ec9] hover:bg-black' : 'bg-gray-400'
              }`}
            >
              {resourceClicks >= threshold ? 'Claim Badge' : 'Claim Badge'}
            </button>
          </div>
        )}
      </div>
    );
  };

  if (!profile) return <p className="text-center mt-12">Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r flex flex-col justify-between">
        <div>
          <div className="p-6 flex items-center justify-center border-b">
            <img src={logo} alt="Logo" className="h-14 object-contain" />
          </div>
          <nav className="flex flex-col p-6 space-y-4">
            {['dashboard', 'profile', 'companies', 'expert', 'resources', 'badges'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`w-full py-2 rounded text-left px-4 font-medium ${
                  activeTab === tab
                    ? 'bg-[#0c5ec9] text-white'
                    : 'text-[#0c5ec9] hover:bg-black hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        <header className="bg-white shadow px-4 py-6 flex justify-end items-center">
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
            <>
              {/* Skill & Roadmap */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <div className="bg-white p-6 rounded shadow flex flex-col justify-between min-h-[300px]">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Skill Assessment</h3>
                    {profile.assessment_done ? (
                      <p className="text-gray-600 mb-4">
                        ✅ Already done for <strong>{profile.interest}</strong>.<br />
                        Level: <strong>{profile.assessment_level}</strong>.
                      </p>
                    ) : (
                      <p className="text-gray-600 mb-4">Evaluate your skills and get recommendations.</p>
                    )}
                  </div>
                  <button
                    onClick={() => navigate('/assessment')}
                    disabled={profile.assessment_done}
                    className={`inline-block px-4 py-2 rounded text-white ${
                      profile.assessment_done ? 'bg-gray-400' : 'bg-[#0c5ec9] hover:bg-black'
                    }`}
                  >
                    {profile.assessment_done ? 'Assessment Completed' : 'Take Assessment'}
                  </button>
                </div>

                <div className="bg-white p-6 rounded shadow flex flex-col justify-between min-h-[300px]">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Roadmap</h3>
                    <p className="text-gray-600 mb-4">View your personalized roadmap.</p>
                  </div>
                  <button
                    onClick={() => navigate('/roadmap')}
                    className="inline-block px-4 py-2 bg-[#0c5ec9] text-white rounded hover:bg-black"
                  >
                    View Roadmap
                  </button>
                </div>
              </div>

              {/* Companies */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-6 text-[#0c5ec9]">
                  <span className="bg-[#0c5ec9] text-white px-2 py-1 rounded mr-2">Companies</span>
                  you may want to apply
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companies.map((c) => (
                    <div key={c.id} className="bg-white shadow-md rounded-lg p-5 flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{c.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{c.focus_areas}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <a href={c.linkedin_url} target="_blank" rel="noreferrer" className="px-4 py-1 bg-gray-200 rounded hover:bg-[#0c5ec9] hover:text-white">LinkedIn</a>
                        <a href={c.website} target="_blank" rel="noreferrer" className="px-4 py-1 bg-gray-200 rounded hover:bg-[#0c5ec9] hover:text-white">Website</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
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

          {activeTab === 'badges' && (
            <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Badges</h2>
              {badgeLevels.map(renderBadge)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
