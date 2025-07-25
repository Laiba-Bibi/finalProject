import React, { useEffect, useState } from 'react';

const SkillAssessment = () => {
  const [profile, setProfile] = useState(null);
  const [matrix, setMatrix] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loadingMatrix, setLoadingMatrix] = useState(true); // ✅ New flag
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Get profile
        const res = await fetch('http://127.0.0.1:8000/api/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profileData = await res.json();
        console.log('✅ [Profile Loaded]', profileData);

        setProfile(profileData);

        if (!profileData.interest) {
          console.warn('⚠️ [NO INTEREST SET] This user does not have an interest yet.');
          return;
        }

        // 2️⃣ Check if already done
        const statusRes = await fetch('http://127.0.0.1:8000/api/assessment-status/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const statusData = await statusRes.json();
        console.log('✅ [Assessment Status]', statusData);

        if (statusData.already_done) {
          setResult({
            already_done: true,
            level: statusData.level,
            interest: statusData.interest,
          });
          setLoadingMatrix(false); // ✅ Done
        } else {
          console.log('✅ [Fetching Skill Matrix for]', profileData.interest);

          const mRes = await fetch(
            `http://127.0.0.1:8000/api/skill-matrix/${profileData.interest}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const mData = await mRes.json();
          console.log('✅ [Skill Matrix]', mData);

          // ✅ Deduplicate by name
          const unique = [];
          const seen = new Set();
          for (const item of mData) {
            if (!seen.has(item.name)) {
              seen.add(item.name);
              unique.push(item);
            }
          }

          setMatrix(unique);
          setLoadingMatrix(false); // ✅ Done
        }
      } catch (error) {
        console.error('❌ [Fetch Error]', error);
        setLoadingMatrix(false); // ✅ Stop loading on error too
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (id, val) => {
    setAnswers((prev) => ({ ...prev, [id]: parseInt(val) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://127.0.0.1:8000/api/assess-skill/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    });

    const data = await res.json();
    setResult(data);
  };

  if (!profile) return <p>Loading...</p>;

  if (!profile.interest) {
    return (
      <div className="p-8 max-w-3xl mx-auto bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">❌ No Interest Set</h2>
        <p className="text-lg">You must select an interest before taking an assessment.</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="p-8 max-w-3xl mx-auto bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Assessment Result</h2>
        {result.already_done ? (
          <p className="text-lg">
            ✅ You have already done your assessment for{' '}
            <strong>{result.interest}</strong>. <br />
            Your current skill level is <strong>{result.level}</strong>.
          </p>
        ) : (
          <p className="text-lg">
            🎉 Your new assessment for <strong>{profile.interest}</strong> is done! <br />
            Your calculated skill level is <strong>{result.level}</strong>.
          </p>
        )}
        <a
          href="/dashboard"
          className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
        >
          Back to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Skill Assessment for {profile.interest}</h2>

      {/* ✅ Warning only if matrix is empty AND done loading */}
      {matrix.length === 0 && !loadingMatrix && (
        <p className="mb-4 text-red-600">
          ⚠️ No skills found for this interest. Please check your categories and subskills.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {matrix.map((skill) => (
          <div key={skill.id} className="mb-4">
            <label className="block font-medium">
              {skill.category} - {skill.name} ({skill.importance})
            </label>
            <select
              required
              onChange={(e) => handleChange(skill.id, e.target.value)}
              value={answers[skill.id] || ''}
              className="w-full p-2 border rounded"
            >
              <option value="">Rate 1–5</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
        >
          Submit Assessment
        </button>
      </form>
    </div>
  );
};

export default SkillAssessment;