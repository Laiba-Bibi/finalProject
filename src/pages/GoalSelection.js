import React, { useState } from 'react';
import Navbar from '../components/Navbar';
     import Footer from '../components/Footer';

     const GoalSelection = () => {
       const [goal, setGoal] = useState('');

       const handleSubmit = (e) => {
         e.preventDefault();
         // Placeholder for form submission
         console.log('Selected Goal:', goal);
       };

       return (
         <div className="bg-gray-100 min-h-screen flex flex-col">
           <Navbar />
           <main className="container mx-auto py-12 flex-grow">
             <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
               <h2 className="text-2xl font-bold text-primary mb-6 text-center">Select Your Career Goal</h2>
               <form onSubmit={handleSubmit}>
                 <div className="mb-4">
                   <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                     Career Goal
                   </label>
                   <select
                     id="goal"
                     value={goal}
                     onChange={(e) => setGoal(e.target.value)}
                     className="mt-1 p-2 w-full border rounded-lg focus:ring-primary focus:border-primary"
                     required
                   >
                     <option value="">Select a goal</option>
                     <option value="software_engineer">Software Engineer</option>
                     <option value="data_scientist">Data Scientist</option>
                     <option value="product_manager">Product Manager</option>
                     <option value="ux_designer">UX Designer</option>
                   </select>
                 </div>
                 <button
                   type="submit"
                   className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-800"
                 >
                   Save Goal
                 </button>
               </form>
             </div>
           </main>
           <Footer />
         </div>
       );
     };

     export default GoalSelection;