import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Hasła muszą być identyczne.");
      return;
    }

    try {
      const response = await fetch(`/api/user/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      

      if (response.ok) {
        setMessage("Zmieniono Hasło!")
        setError("")
        setTimeout(() => navigate('/'), 3500);

        
      } else {
        setError("Link wygasł, zresetuj ponownie.");
        setMessage("")
      }
    } catch (error) {
      console.log(error);
      setError("Coś poszło nie tak, spróbuj ponownie.");
      setMessage("")
    }
  };

  return (
    <div className="flex justify-center">
        
     
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <h3 className="block text-[#00df9a] text-sm font-bold mb-4 text-center">Zresetuj Hasło</h3>
      <div className="mb-4">
      <label className="block text-gray-700 text-sm text-center font-bold mb-2">Nowe Hasło:</label>
          <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
        <label className="block text-gray-700 text-sm text-center font-bold mb-2">Potwierdź Hasło:</label>
          <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg mt-2">{error}</p>}
      
        <div class="flex justify-center">
        <button type="submit" className="p-4 mb-4 text-sm bg-gray-500 hover:bg-[#00df9a] text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline">Zapisz</button>
        </div>
        {message && <div className="p-4 mb-4 text-sm text-green-500 bg-green-200 rounded-lg mt-2">{message}</div>}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
