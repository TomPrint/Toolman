import { FaUserCircle, FaTrash } from "react-icons/fa";

const UserDetails = ({ user }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg shadow-cyan-500/40 border-solid border-cyan-700 border-2">
      <img
        className="w-full rounded"
        src="computeruser.JPG"
        alt="keyboard"
      ></img>
      <div className="px-3 py-2">
        <div className="flex font-bold text-sm mb-2">
        <FaUserCircle /><span className="ml-2">{user.name}</span>
        </div>
        <div className="font-bold text-xs mb-2">{user.email}</div>
        <button className="flex font-bold text-sm mb-2 bg-transparent hover:bg-red-700 text-[#00df9a] font-semibold hover:text-white py-2 px-4 border border-[#00df9a] hover:border-transparent rounded">
        <FaTrash /><span className="ml-2">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
