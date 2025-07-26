import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Roadmap = () => {
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/generate-roadmap/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setRoadmap(data.roadmap);
        } else {
          setRoadmap('❌ ' + (data.error || 'Failed to generate roadmap.'));
        }
      } catch (error) {
        setRoadmap('❌ Error fetching roadmap.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [token]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto py-12 flex-grow">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Your AI-Powered Career Roadmap</h2>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg whitespace-pre-wrap">
          {loading ? (
            <p className="text-gray-600 text-center">Generating roadmap using AI...</p>
          ) : (
            <p className="text-gray-800">{roadmap}</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Roadmap;
