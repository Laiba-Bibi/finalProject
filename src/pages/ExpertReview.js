import React, { useState } from 'react';
import Navbar from '../components/Navbar';
     import Footer from '../components/Footer';

     const ExpertReview = () => {
       const [submission, setSubmission] = useState('');

       const handleSubmit = (e) => {
         e.preventDefault();
         // Placeholder for form submission
         console.log('Submission:', submission);
       };

       return (
         <div className="bg-gray-100 min-h-screen flex flex-col">
           <Navbar />
           <main className="container mx-auto py-12 flex-grow">
             <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
               <h2 className="text-2xl font-bold text-primary mb-6 text-center">Expert Review</h2>
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
                 <button
                   type="submit"
                   className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-800"
                 >
                   Submit for Review
                 </button>
               </form>
             </div>
           </main>
           <Footer />
         </div>
       );
     };

     export default ExpertReview;