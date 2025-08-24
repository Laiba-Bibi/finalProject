import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ExpertReview = () => {
  const [submission, setSubmission] = useState('');
  const [existing, setExisting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/my-review/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.review) {
            setExisting(data.review);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/submit-review/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: submission }),
      });

      const data = await res.json();

      if (res.ok) {
        setExisting({ ...data, message: submission });
        setSubmission('');
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit review.');
    }
  };

  if (loading) return <p className="text-center mt-12">Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto py-12 flex-grow">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Expert Review</h2>

          {existing ? (
            <div className="text-gray-800 space-y-3">
              <p><strong>✅ Submitted:</strong> {existing.message}</p>
              <p><strong>📌 Feedback:</strong> {existing.expert_feedback || 'No feedback yet.'}</p>

              {existing.expert_name && (
                <>
                  <hr className="my-4" />
                  <h3 className="text-lg font-semibold text-primary">👨‍🏫 Expert Details</h3>
                  <p><strong>Name:</strong> {existing.expert_name}</p>
                  <p><strong>Title:</strong> {existing.expert_job_title}</p>
                  <p><strong>Experience:</strong> {existing.expert_years_experience} years</p>
                  <p><strong>Expertise:</strong> {existing.expert_areas_expertise}</p>
                  {existing.expert_linkedin_url && (
                    <p>
                      <strong>LinkedIn:</strong>{' '}
                      <a
                        href={existing.expert_linkedin_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Profile
                      </a>
                    </p>
                  )}
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="submission" className="block text-sm font-medium text-gray-700">
                  Submit Your Work
                </label>
                <textarea
                  id="submission"
                  value={submission}
                  onChange={(e) => setSubmission(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-lg focus:ring-primary focus:border-primary"
                  rows="5"
                  placeholder="Paste your code, project link, or description"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-800"
              >
                Submit for Review
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExpertReview;
