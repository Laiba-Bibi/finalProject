import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExpertRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        jobTitle: '',
        yearsExperience: '',
        areasExpertise: [],
        linkedinUrl: '',
        portfolioUrl: '',
        availability: '',
        mentoringFormat: [],
        motivationStatement: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMultiSelect = (e, name) => {
        const options = Array.from(e.target.selectedOptions).map(option => option.value);
        setFormData({ ...formData, [name]: options.join(',') });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/experts/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                setSuccess('Application submitted successfully!');
                setTimeout(() => navigate('/experts/login'), 2000); // Redirect to login after 2 seconds
                setFormData({
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    jobTitle: '',
                    yearsExperience: '',
                    areasExpertise: [],
                    linkedinUrl: '',
                    portfolioUrl: '',
                    availability: '',
                    mentoringFormat: [],
                    motivationStatement: '',
                });
            } else {
                setError('Error submitting application');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">Join as an Expert</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:border-secondary"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:border-secondary"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number (Optional)</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:border-secondary"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Job Title</label>
                        <input
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:border-secondary"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Years of Experience</label>
                        <input
                            type="number"
                            name="yearsExperience"
                            value={formData.yearsExperience}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:border-secondary"
                            required
                            min="0"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Areas of Expertise</label>
                        <select
                            multiple
                            name="areasExpertise"
                            onChange={(e) => handleMultiSelect(e, 'areasExpertise')}
                            className="w-full p-2 border rounded focus:border-secondary"
                            required
                        >
                            <option value="Web Development">Web Development</option>
                            <option value="AI/ML">AI/ML</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Cloud Computing">Cloud Computing</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">LinkedIn URL (Optional)</label>
                        <input
                            type="url"
                            name="linkedinUrl"
                            value={formData.linkedinUrl}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:border-secondary"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Portfolio URL (Optional)</label>
                        <input
                            type="url"
                            name="portfolioUrl"
                            value={formData.portfolioUrl}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:border-secondary"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Availability</label>
                        <select
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:border-secondary"
                            required
                        >
                            <option value="">Select Availability</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Evenings">Evenings</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Preferred Mentoring Format</label>
                        <select
                            multiple
                            name="mentoringFormat"
                            onChange={(e) => handleMultiSelect(e, 'mentoringFormat')}
                            className="w-full p-2 border rounded focus:border-secondary"
                        >
                            <option value="Written Feedback">Written Feedback</option>
                            <option value="Group Sessions">Group Sessions</option>
                        </select>
                    </div>
                    <div className="mb-4 col-span-2">
                        <label className="block text-gray-700">Why do you want to mentor?</label>
                        <textarea
                            name="motivationStatement"
                            value={formData.motivationStatement}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:border-secondary"
                            rows="4"
                            required
                            maxLength="500"
                        ></textarea>
                    </div>
                    <div className="mb-4 col-span-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                required
                                className="mr-2"
                            />
                            I agree to the Terms and Conditions
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white p-2 rounded hover:bg-opacity-90"
                >
                    Apply as an Expert
                </button>
            </form>
            <p className="mt-4 text-center">
                Already an expert? <a href="/experts/login" className="text-secondary">Log In</a>
            </p>
        </div>
    );
};

export default ExpertRegister;