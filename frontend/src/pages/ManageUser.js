import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import MyModal from "../components/DeleteUserModal";
import LoadingSpinner from "../components/LoadingSpinner";

function ManageUser() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  useEffect(() => {
    getData();
  }, [user]);
  async function deleteOperation(_id) {
    let result = await fetch(`/api/user/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    result = await result.json();
    console.warn(result);
    getData();
  }

  async function getData() {
    setLoading(true);
    let result = await fetch("/api/user/users");
    result = await result.json();
    setUser(result);
    
    // checking if activeuser in localstorage is admin
    const emails = result.flatMap((user) => (user.isAdmin ? user.email : []));
    const item = JSON.parse(localStorage.getItem("user"));
    const activeuser = item.email;
    console.log(activeuser);
    console.log(emails);
    if (emails.includes(activeuser)) {
      console.log('✅ Active User is Admin');
    }

    setLoading(false);
  }


  return (
    <div>
      <h1 className="flex justify-center py-4 text-xl font-bold">
        Zarządzaj użytkownikami:
      </h1>
      <div className="flex justify-center py-2">
        <div className="flex justify-between items-center h-30 max-w-[1240px] mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center ">
              <LoadingSpinner />
            </div>
          ) : (
            <div className=" overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-center text-white">
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
                    <th scope="col" className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      user={user}
                      className="bg-rgba(6, 18, 36, 0.945) border-b border-[#00df9a] "
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-white whitespace-nowrap"
                      >
                        {user.name}
                      </th>
                      <td className="py-4 px-6 hidden sm:table-cell">
                        {user.email}
                      </td>
                      <td className="py-4 px-6">
                        {user.isAdmin ? "Tak" : "Nie"}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <MyModal onSubmit={() => deleteOperation(user._id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageUser;
