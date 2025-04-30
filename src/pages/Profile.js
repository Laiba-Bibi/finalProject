import React, { useState } from 'react';
import Navbar from '../components/Navbar';
     import Footer from '../components/Footer';

     const Profile = () => {
       const [name, setName] = useState('John Doe');
       const [email, setEmail] = useState('john@example.com');

       const handleSubmit = (e) => {
         e.preventDefault();
         // Placeholder for form submission
         console.log('Profile:', { name, email });
       };

       return (
         <div className="bg-gray-100 min-h-screen flex flex-col">
           <Navbar />
           <main className="container mx-auto py-12 flex-grow">
             <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
               <h2 className="text-2xl font-bold text-primary mb-6 text-center">Your Profile</h2>
               <form onSubmit={handleSubmit}>
                 <div className="mb-4">
                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                     Name
                   </label>
                   <input
                     type="text"
                     id="name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="mt-1 p-2 w-full border rounded-lg focus:ring-primary focus:border-primary"
                     required
                   />
                 </div>
                 <div className="mb-6">
                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                     Email
                   </label>
                   <input
                     type="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="mt-1 p-2 w-full border rounded-lg focus:ring-primary focus:border-primary"
                     required
                   />
                 </div>
                 <button
                   type="submit"
                   className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-800"
                 >
                   Update Profile
                 </button>
               </form>
             </div>
           </main>
           <Footer />
         </div>
       );
     };

     export default Profile;