import { useState, useEffect } from "react";
import { UserManagement } from "./components/UserManagement";
import { RoleManagement } from "./components/RoleManagement";
import { getUsers, getRoles } from "./api/mockApi";
import { Header } from "./components/header";

const App = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await getUsers();
      const roleResponse = await getRoles();
      setUsers(userResponse.data);
      setRoles(roleResponse.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header/>
      <div className="container">
        <div className="tabs">
          <div
            className={`tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </div>
          <div
            className={`tab ${activeTab === "roles" ? "active" : ""}`}
            onClick={() => setActiveTab("roles")}
          >
            Roles
          </div>
        </div>
        <div className="tab-content">
          {activeTab === "users" && <UserManagement users={users} setUsers={setUsers} roles={roles} />}
          {activeTab === "roles" && <RoleManagement roles={roles} setRoles={setRoles} />}
        </div>
      </div>
    </>
  );
};

export default App;
