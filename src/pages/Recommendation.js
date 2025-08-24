import axios from "axios";
import { useEffect, useState } from "react";

const Recommendation = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recommended-software-houses/")
      .then(res => {
        setCompanies(res.data);
      })
      .catch(err => {
        console.error("Error fetching companies:", err);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#0c5ec9]">
        <span className="bg-[#0c5ec9] text-white px-2 py-1 rounded mr-2">Companies</span>
        you may want to apply
      </h2>

      {companies.length === 0 ? (
        <p className="text-gray-600">No companies found for your interest.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map(company => (
            <div
              key={company.id}
              className="bg-white shadow-md rounded-lg p-5 flex justify-between items-start"
            >
              {/* Left: Company Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-800">{company.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{company.focus_areas}</p>
              </div>

              {/* Right: Buttons */}
              <div className="flex flex-col items-end space-y-2">
                <a
                  href={company.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1 bg-gray-200 rounded hover:bg-[#0c5ec9] hover:text-white transition"
                >
                  LinkedIn
                </a>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1 bg-gray-200 rounded hover:bg-[#0c5ec9] hover:text-white transition"
                >
                  Website
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendation;