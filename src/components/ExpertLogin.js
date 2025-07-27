import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExpertLogin = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/experts/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                setToken(data.access_token); // Update parent if needed
                navigate('/experts/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred: ' + (err.message || 'Unknown error'));
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">Expert Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded focus:border-secondary"
                        placeholder="e.g., expert@company.com"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded focus:border-secondary"
                        placeholder="Minimum 8 characters"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white p-2 rounded hover:bg-opacity-90"
                >
                    Log In
                </button>
            </form>
            <p className="mt-4 text-center">
                Not an expert? <a href="/experts/register" className="text-secondary">Join as an Expert</a>
            </p>
        </div>
    );
};

export default ExpertLogin;