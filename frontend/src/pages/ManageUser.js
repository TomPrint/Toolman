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
    <div>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Delete</th>
        </tr>
        {users.map((user) => (
          <tr key={user._id} user={user}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => deleteOperation(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

export default ManageUser;
