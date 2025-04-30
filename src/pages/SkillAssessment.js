import React, { useState } from 'react';
import Navbar from '../components/Navbar';
     import Footer from '../components/Footer';

     const SkillAssessment = () => {
       const [skills, setSkills] = useState({
         coding: 0,
         problemSolving: 0,
         communication: 0,
       });

       const handleSubmit = (e) => {
         e.preventDefault();
         // Placeholder for form submission
         console.log('Skills:', skills);
       };

       return (
         <div className="bg-gray-100 min-h-screen flex flex-col">
           <Navbar />
           <main className="container mx-auto py-12 flex-grow">
             <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
               <h2 className="text-2xl font-bold text-primary mb-6 text-center">Skill Assessment</h2>
               <form onSubmit={handleSubmit}>
                 <div className="mb-4">
                   <label htmlFor="coding" className="block text-sm font-medium text-gray-700">
                     Coding (0-10)
                   </label>
                   <input
                     type="number"
                     id="coding"
                     min="0"
                     max="10"
                     value={skills.coding}
                     onChange={(e) => setSkills({ ...skills, coding: e.target.value })}
                     className="mt-1 p-2 w-full border rounded-lg focus:ring-primary focus:border-primary"
                     required
                   />
                 </div>
                 <div className="mb-4">
                   <label htmlFor="problemSolving" className="block text-sm font-medium text-gray-700">
                     Problem Solving (0-10)
                   </label>
                   <input
                     type="number"
                     id="problemSolving"
                     min="0"
                     max="10"
                     value={skills.problemSolving}
                     onChange={(e) => setSkills({ ...skills, problemSolving: e.target.value })}
                     className="mt-1 p-2 w-full border rounded-lg focus:ring-primary focus:border-primary"
                     required
                   />
                 </div>
                 <div className="mb-6">
                   <label htmlFor="communication" className="block text-sm font-medium text-gray-700">
                     Communication (0-10)
                   </label>
                   <input
                     type="number"
                     id="communication"
                     min="0"
                     max="10"
                     value={skills.communication}
                     onChange={(e) => setSkills({ ...skills, communication: e.target.value })}
                     className="mt-1 p-2 w-full border rounded-lg focus:ring-primary focus:border-primary"
                     required
                   />
                 </div>
                 <button
                   type="submit"
                   className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-800"
                 >
                   Submit Assessment
                 </button>
               </form>
             </div>
           </main>
           <Footer />
         </div>
       );
     };

     export default SkillAssessment;