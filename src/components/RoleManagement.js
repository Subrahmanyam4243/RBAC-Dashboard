import { useState } from "react";

export const RoleManagement = ({ roles, setRoles }) => {
  const [roleName, setRoleName] = useState("");
  const [editingRole, setEditingRole] = useState(null);

  const handleAddRole = () => {
    const newRole = { id: roles.length + 1, name: roleName, permissions: [] };
    setRoles([...roles, newRole]);
    setRoleName("");
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setRoleName(role.name);
  };

  const handleUpdateRole = () => {
    const updatedRoles = roles.map((role) =>
      role.id === editingRole.id ? { ...role, name: roleName } : role
    );
    setRoles(updatedRoles);
    setEditingRole(null);
    setRoleName("");
  };

  const handleDeleteRole = (id) => {
    const filteredRoles = roles.filter((role) => role.id !== id);
    setRoles(filteredRoles);
  };

  return (
    <div>
      <h2>Role Management</h2>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                <button onClick={() => handleEditRole(role)}>Edit</button>
                &nbsp;
                <button onClick={() => handleDeleteRole(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingRole ? (
        <div>
          <h3>Edit Role</h3>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Role Name"
          />
          <button onClick={handleUpdateRole}>Update Role</button>
        </div>
      ) : (
        <div>
          <h3>Add New Role</h3>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Role Name"
          />
          <button onClick={handleAddRole}>Add Role</button>
        </div>
      )}
    </div>
  );
};





