import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Resources = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchResources = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/resources/', {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Fix 1: Template literal
          },
        });
        const data = await res.json();
        console.log('Fetched resources:', data);
        setResources(data);
      } catch (err) {
        console.error('Failed to fetch resources:', err);
      }
    };

    fetchResources();
  }, [navigate, token]);

  const handleResourceClick = async (resourceId, resourceUrl) => {
    try {
      const response = await fetch('http://localhost:8000/api/resource-click/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Fix 2: Template literal
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resource_id: resourceId }),
      });
      if (response.ok) {
        console.log('Resource click recorded for ID:', resourceId);
      } else {
        console.error('Failed to record click:', await response.json());
      }
    } catch (error) {
      console.error('Error recording resource click:', error);
    }

    // Always navigate to the resource
    window.open(resourceUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-6 md:p-12">
      <h2 className="text-2xl font-bold text-[#0c5ec9] mb-6 text-center">Recommended Resources</h2>

      {resources.length === 0 ? (
        <p className="text-gray-600">No resources available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res) => {
            const formattedUrl = res.url?.startsWith('http')
              ? res.url
              : `https://${res.url}`; // ✅ Fix 3: Template literal

            return (
              <div key={res.id} className="bg-white p-5 rounded shadow">
                <h3 className="text-xl font-semibold">{res.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {res.interest?.toUpperCase()}
                </p>

                <button
                  onClick={() => handleResourceClick(res.id, formattedUrl)}
                  className="inline-block mt-2 px-4 py-2 bg-[#0c5ec9] text-white rounded hover:bg-black transition duration-200"
                >
                  Visit Resource
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Resources;
