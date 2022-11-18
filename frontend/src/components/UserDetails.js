import { FaUserCircle, FaTrash } from "react-icons/fa";
import { useState } from "react";

const UserDetails = ({ user }) => {
  const [msg, setMsg] = useState(null);

  const handleClick = async () => {
      setMsg(null);
      const response = await fetch(`/api/user/${user._id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
        
      });
      
      const json = await response.json();

      console.log(json);
      setMsg("Delete Completed");
  };

  return (
    <div className="rounded overflow-hidden shadow-lg shadow-cyan-500/40 border-solid border-cyan-700 border-2">
      <img
        className="w-full rounded"
        src="computeruser.JPG"
        alt="keyboard"
      ></img>
      <div className="px-3 py-2">
        <div className="flex font-bold text-sm mb-2">
          <FaUserCircle />
          <span className="ml-2">{user.name}</span>
        </div>
        <div className="font-bold text-xs mb-2">{user.email}</div>
        <button className="flex font-bold text-sm mb-2 bg-transparent hover:bg-red-700 text-[#00df9a] font-semibold hover:text-white py-2 px-4 border border-[#00df9a] hover:border-transparent rounded">
          <FaTrash />
          <span onClick={handleClick} className="ml-2">
            Delete
          </span>
          
        </button>
          {msg && (
            <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 mt-2">
              {msg}
            </div>
          )}
        
      </div>
    </div>
  );
};

export default UserDetails;
