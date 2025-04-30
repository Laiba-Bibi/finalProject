import React from 'react';
     import { Link } from 'react-router-dom';
     import Navbar from '../components/Navbar';
     import Footer from '../components/Footer';

     const Dashboard = () => {
       return (
         <div className="bg-gray-100 min-h-screen flex flex-col">
           <Navbar />
           <main className="container mx-auto py-12 flex-grow">
             <h2 className="text-3xl font-bold text-primary mb-8 text-center">Your Dashboard</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                 <h3 className="text-xl font-semibold text-primary mb-2">Career Goals</h3>
                 <p className="text-gray-600 mb-4">Set or update your career objectives.</p>
                 <Link
                   to="/goals"
                   className="inline-block px-4 py-2 bg-secondary text-black rounded-lg hover:bg-yellow-300"
                 >
                   Go to Goals
                 </Link>
               </div>
               <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                 <h3 className="text-xl font-semibold text-primary mb-2">Skill Assessment</h3>
                 <p className="text-gray-600 mb-4">Evaluate your current skills.</p>
                 <Link
                   to="/assessment"
                   className="inline-block px-4 py-2 bg-secondary text-black rounded-lg hover:bg-yellow-300"
                 >
                   Take Assessment
                 </Link>
               </div>
               <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                 <h3 className="text-xl font-semibold text-primary mb-2">Roadmap</h3>
                 <p className="text-gray-600 mb-4">View your personalized career path.</p>
                 <Link
                   to="/roadmap"
                   className="inline-block px-4 py-2 bg-secondary text-black rounded-lg hover:bg-yellow-300"
                 >
                   View Roadmap
                 </Link>
               </div>
             </div>
           </main>
           <Footer />
         </div>
       );
     };

     export default Dashboard;