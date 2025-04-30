import React, { useState } from 'react';
     import { Link } from 'react-router-dom';
     import Navbar from '../components/Navbar';
     import Footer from '../components/Footer';

     const LoginPage = () => {
       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');

       const handleSubmit = (e) => {
         e.preventDefault();
         // Placeholder for form submission
         console.log('Login:', { email, password });
       };

       return (
         <div className="bg-gray-100 min-h-screen flex flex-col">
           <Navbar />
           <main className="container mx-auto py-12 flex-grow">
             <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
               <h2 className="text-2xl font-bold text-primary mb-6 text-center">Login</h2>
               <form onSubmit={handleSubmit}>
                 <div className="mb-4">
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
                 <div className="mb-6">
                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                     Password
                   </label>
                   <input
                     type="password"
                     id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="mt-1 p-2 w-full border rounded-lg focus:ring-primary focus:border-primary"
                     required
                   />
                 </div>
                 <button
                   type="submit"
                   className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-800"
                 >
                   Login
                 </button>
               </form>
               <p className="mt-4 text-center">
                 Don't have an account?{' '}
                 <Link to="/register" className="text-primary hover:underline">
                   Register
                 </Link>
               </p>
             </div>
           </main>
           <Footer />
         </div>
       );
     };

     export default LoginPage;