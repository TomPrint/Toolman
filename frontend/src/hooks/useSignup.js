import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();
  const [msg, setMsg] = useState(null);

  const signup = async (name, email, password, isAdmin) => {
    setIsLoading(true);
    setError(null);
    setMsg(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, isAdmin }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // to log in user after signup
      // save the user to local storage
      // localStorage.setItem("user", JSON.stringify(json));
      setMsg("Utorzono Użytkownika");

      // update the auth context
      // dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, msg };
};
