import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
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

      const data = await response.json();
      console.log(token)

      if (response.ok) {
        setMessage("Zmieniono Hasło")
        
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
          className="text-black"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
          className="text-black"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
