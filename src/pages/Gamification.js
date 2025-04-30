import React from 'react';
import Navbar from '../components/Navbar';
     import Footer from '../components/Footer';

     const Gamification = () => {
       return (
         <div className="bg-gray-100 min-h-screen flex flex-col">
           <Navbar />
           <main className="container mx-auto py-12 flex-grow">
             <h2 className="text-3xl font-bold text-primary mb-8 text-center">Your Progress</h2>
             <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
               <div className="mb-6">
                 <h3 className="text-xl font-semibold text-primary mb-2">Points</h3>
                 <p className="text-gray-600">You have earned <span className="font-bold">250 points</span>.</p>
               </div>
               <div className="mb-6">
                 <h3 className="text-xl font-semibold text-primary mb-2">Badges</h3>
                 <div className="flex space-x-4">
                   <div className="bg-secondary text-black p-4 rounded-lg">Beginner Badge</div>
                   <div className="bg-gray-300 text-gray-600 p-4 rounded-lg">Pro Badge (Locked)</div>
                 </div>
               </div>
               <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800">
                 View Challenges
               </button>
             </div>
           </main>
           <Footer />
         </div>
       );
     };

     export default Gamification;