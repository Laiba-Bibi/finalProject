import React from 'react';
import Navbar from '../components/Navbar';
     import Footer from '../components/Footer';

     const Roadmap = () => {
       return (
         <div className="bg-gray-100 min-h-screen flex flex-col">
           <Navbar />
           <main className="container mx-auto py-12 flex-grow">
             <h2 className="text-3xl font-bold text-primary mb-8 text-center">Your Career Roadmap</h2>
             <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
               <p className="text-gray-600 mb-4">
                 Based on your goals and skills, here’s your personalized roadmap:
               </p>
               <ul className="list-disc pl-6 mb-6">
                 <li className="mb-2">Learn JavaScript (3 months)</li>
                 <li className="mb-2">Build a portfolio project (2 months)</li>
                 <li className="mb-2">Apply for junior developer roles (1 month)</li>
               </ul>
               <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800">
                 Update Roadmap
               </button>
             </div>
           </main>
           <Footer />
         </div>
       );
     };

     export default Roadmap;