import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [isAdmin, setisAdmin] = useState(null);
  const { signup, error, isLoading, msg } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password, isAdmin);
  };

  const handleChange = (e) => {
    setisAdmin(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <form
        className="signup bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h3 className="block text-[#00df9a] text-sm font-bold mb-2 text-center">
          Create a New User
        </h3>
        <div class="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email address:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Admin:
          </label>

          <select
           
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={isAdmin}
            onChange={handleChange}
            
          > 
            <option value="">-- Choose --</option>
            <option value={true}>Tak</option>
            <option value={false}>Nie</option>
          </select>
        </div>
        <div className="container min-w-full flex flex-col items-center">
          <button
            disabled={isLoading}
            className=" bg-gray-500 hover:bg-[#00df9a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign up
          </button>
          {error && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mt-2">
              {error}
            </div>
          )}
          {msg && (
            <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 mt-2">
              {msg}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
