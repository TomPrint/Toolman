import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setSuccessMessage(data.message);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error);
      setSuccessMessage('');
    }
  };


return (
    <div className="flex justify-center">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <h3 className="block text-[#00df9a] text-sm font-bold mb-4 text-center">Zresetuj Hasło</h3>

       <div className="mb-4">
      <label className="block text-gray-700 text-sm text-center font-bold mb-2">Email:</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="email" 
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      </div>
        <div className="container min-w-full flex flex-col items-center">
      <button type="submit" className=" bg-gray-500 hover:bg-[#00df9a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reset Hasła</button>
      <Link to='/login'><button className=" bg-gray-500 hover:bg-[#00df9a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">Wróć</button></Link>
      {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mt-2">
        {errorMessage}</div>}
        {successMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mt-2">
        {successMessage}</div>}
      </div>
    
    </form>
    
    </div>
 
  )
}

export default ResetPasswordForm;