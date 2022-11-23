import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function ManageUser() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  async function deleteOperation(_id) {
    let result = await fetch(`/api/user/${_id}`, {
      method: "DELETE",
    });
    result = await result.json();
    console.warn(result);
    getData();
  }

  async function getData() {
    let result = await fetch("/api/user/users");
    result = await result.json();
    setUser(result);
  }

  return (
    <div className="flex justify-center py-2">
<div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4">
<div className=" overflow-x-auto relative shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-center text-white">
        <caption className="p-5 text-lg font-semibold text-center text-white bg-rgba(6, 18, 36, 0.945) dark:text-white">
           Użytkownicy
            <p className="mt-1 text-sm font-normal text-white">Zarządzaj Użytkownikami</p>
        </caption>
        <thead className="text-xs text-white uppercase bg-rgba(6, 18, 36, 0.945)">
            <tr>
                <th scope="col" className="py-3 px-6">
                    Nazwa
                </th>
                <th scope="col" className="py-3 px-6 hidden sm:table-cell">
                    Email
                </th>
                <th scope="col" className="py-3 px-6">
                    Admin
                </th>
                <th scope="col" className="py-3 px-6">
                </th>
        
            </tr>
        </thead>
        <tbody>
        {users.map((user) => (

            <tr key={user._id} user={user} className="bg-rgba(6, 18, 36, 0.945) border-b border-[#00df9a] ">
                <th scope="row" className="py-4 px-6 font-medium text-white whitespace-nowrap">
                {user.name}
                </th>
                <td className="py-4 px-6 hidden sm:table-cell">
                {user.email}
                </td>
                <td className="py-4 px-6">
                {user.isAdmin ? "Tak" : "Nie"}
                </td>

                <td className="py-4 px-6 text-right">
                <button className="bg-red-500 hover:bg-[#00df9a]  text-white font-semibold py-2 px-4 border border-zinc-900 rounded shadow" onClick={() => deleteOperation(user._id)}>Usuń</button>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
</div>
</div>
</div>
  
  );
}

export default ManageUser;
