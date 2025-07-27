import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExpertDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/experts/login');
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">Expert Dashboard</h2>
            <p className="text-gray-700">Welcome to your dashboard! Here you can manage your mentoring tasks and view user progress.</p>
            <button
                onClick={handleLogout}
                className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
                Logout
            </button>
        </div>
    );
};

export default ExpertDashboard;