import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpertDashboard = () => {
    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [feedback, setFeedback] = useState('');
    const expertToken = localStorage.getItem('expertToken'); // ✅ safely gets token

    useEffect(() => {
        axios.get("http://localhost:8000/api/expert/pending-reviews/", {
            headers: { Authorization: `Bearer ${expertToken}` },
        })
        .then(res => setReviews(res.data))
        .catch(err => console.error(err));
    }, []);

    const submitFeedback = (reviewId) => {
       axios.post(`http://localhost:8000/api/expert/submit-feedback/${reviewId}/`, 
            { expert_feedback: feedback, is_reviewed: true },
            { headers: { Authorization: `Bearer ${expertToken}` } }  // ✅ FIXED HERE
        )
        .then(() => {
            alert("Feedback submitted successfully!");
            setSelectedReview(null);
            setFeedback('');
            setReviews(reviews.filter(r => r.id !== reviewId)); // remove from list
        })
        .catch(err => console.error(err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">Expert Dashboard</h2>
            {selectedReview ? (
                <div>
                    <h3 className="text-xl font-semibold mb-2">Reviewing: {selectedReview.user}</h3>
                    <p><strong>Interest:</strong> {selectedReview.interest}</p>
                    <p><strong>Level:</strong> {selectedReview.level}</p>
                    <p><strong>Message:</strong> {selectedReview.message}</p>

                    <textarea
                        className="w-full border mt-4 p-2 rounded"
                        rows="5"
                        placeholder="Write your expert feedback..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>

                    <div className="flex gap-4 mt-4">
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            onClick={() => submitFeedback(selectedReview.id)}
                        >
                            Submit Feedback
                        </button>
                        <button
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            onClick={() => setSelectedReview(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="text-xl mb-4">Pending Review Requests</h3>
                    {reviews.length === 0 ? (
                        <p className="text-gray-600">No review requests at the moment.</p>
                    ) : (
                        <ul className="space-y-3">
                            {reviews.map((review) => (
                                <li key={review.id} className="p-4 border rounded shadow hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setSelectedReview(review)}>
                                    <p><strong>User:</strong> {review.user}</p>
                                    <p><strong>Interest:</strong> {review.interest}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default ExpertDashboard;
