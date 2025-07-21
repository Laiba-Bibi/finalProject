import React from 'react';

const ExpertDashboard = () => {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary">Expert Dashboard</h2>
            <p className="mb-4">Welcome to your dashboard, Expert! Manage mentorship tasks here.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="font-semibold text-primary">Pending Tasks</h3>
                    <p>No pending tasks.</p>
                </div>
                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="font-semibold text-primary">Recent Activity</h3>
                    <p>Reviewed 2 profiles this week.</p>
                </div>
            </div>
        </div>
    );
};

export default ExpertDashboard;