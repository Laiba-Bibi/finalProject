import React, { useState } from 'react';
     import { Link } from 'react-router-dom';
     import Navbar from '../components/Navbar';
     import Footer from '../components/Footer';

     const RegisterPage = () => {
       const [name, setName] = useState('');
       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');

       const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
body: JSON.stringify({ username: name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registration successful! Please login.');
      // Redirect to login page or clear form
      // For example: navigate('/login');
    } else {
      // Show error message from backend
      alert(data.error || 'Registration failed. Try again.');
    }
  } catch (error) {
    alert('Something went wrong. Please try again later.');
  }
};


       return (
         <div className="bg-gray-100 min-h-screen flex flex-col">
           <Navbar />
           <main className="container mx-auto py-12 flex-grow">
             <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
               <h2 className="text-2xl font-bold text-primary mb-6 text-center">Register</h2>
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
                   Register
                 </button>
               </form>
               <p className="mt-4 text-center">
                 Already have an account?{' '}
                 <Link to="/login" className="text-primary hover:underline">
                   Login
                 </Link>
               </p>
             </div>
           </main>
           <Footer />
         </div>
       );
     };

     export default RegisterPage;