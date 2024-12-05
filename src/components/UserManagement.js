import { useState } from "react";
import { createUser, updateUser, deleteUser,  getUsers } from "../api/mockApi";

export const UserManagement = ({ users, setUsers, roles }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState("Active");

  // const handleAddUser = async () => {
  //   const newUser = {
  //     name: userName,
  //     email: userEmail,
  //     role: userRole,
  //     status: userStatus,
  //   };
  //   const response = await createUser(newUser);
  //   if (response.success) {
  //     setUsers([...users, response.data]);
  //     setUserName("");
  //     setUserEmail("");
  //     setUserRole("");
  //     setUserStatus("Active");
  //   } else {
  //     console.error("Error adding user:", response.error);
  //   }
  // };

  const handleAddUser = async () => {
    const newUser = {
      name: userName,
      email: userEmail,
      role: userRole,
      status: userStatus,
    };
    const response = await createUser(newUser);
    if (response.success) {
      // Re-fetch all users from the mock API to ensure consistency
      const updatedUsers = await getUsers();
      setUsers(updatedUsers.data);
      setUserName("");
      setUserEmail("");
      setUserRole("");
      setUserStatus("Active");
    } else {
      console.error("Error adding user:", response.error);
    }
  };
  

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserName(user.name);
    setUserEmail(user.email);
    setUserRole(user.role);
    setUserStatus(user.status);
  };

  const handleUpdateUser = async () => {
    const updatedUser = {
      id: editingUser.id,
      name: userName,
      email: userEmail,
      role: userRole,
      status: userStatus,
    };
    const response = await updateUser(updatedUser);
    if (response.success) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? response.data : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      setUserName("");
      setUserEmail("");
      setUserRole("");
      setUserStatus("Active");
    } else {
      console.error("Error updating user:", response.error);
    }
  };

  const handleDeleteUser = async (id) => {
    const response = await deleteUser(id);
    if (response.success) {
      const filteredUsers = users.filter((user) => user.id !== id);
      setUsers(filteredUsers);
    } else {
      console.error("Error deleting user:", response.error);
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  &nbsp;
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-container">
        {editingUser ? (
          <>
            <h3>Edit User</h3>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Name"
            />
            &nbsp;
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Email"
            />
            &nbsp;
            <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            &nbsp;
            <select value={userStatus} onChange={(e) => setUserStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            &nbsp;
            <button onClick={handleUpdateUser}>Update User</button>
          </>
        ) : (
          <>
            <h3>Add New User</h3>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Name"
            />
            &nbsp;
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Email"
            />
            &nbsp;
            <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            &nbsp;
            <select value={userStatus} onChange={(e) => setUserStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            &nbsp;
            <button onClick={handleAddUser}>Add User</button>
          </>
        )}
      </div>
    </div>
  );
};

