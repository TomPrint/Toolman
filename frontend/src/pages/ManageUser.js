import { useEffect, useState } from "react";
// component
import UserDetails from "../components/UserDetails";

const ManageUser = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/user/users');
      const json = await response.json();
      // to get an array of objet
      if (response.ok) {
        setUsers(json);
      }
    };
    // fire a function
    fetchUsers();
  }, []);


  return (
    <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4 text-white">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
          
        {/* chcecking are there any users and if so map them */}
        {/* using UserDetails from components to show template */}
        {users && users.map(user => (
          <UserDetails key={user._id} user={user}/>
        ))}
      </div>
    </div>
  )
}

export default ManageUser;
