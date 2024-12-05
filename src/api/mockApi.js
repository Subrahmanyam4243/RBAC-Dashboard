// Simulated delay to mimic network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
];

let roles = [
  { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
  { id: 2, name: 'Editor', permissions: ['read', 'write'] },
  { id: 3, name: 'Viewer', permissions: ['read'] },
];

// User CRUD operations
export const getUsers = async () => {
  await delay(500); // Simulate network delay
  return { success: true, data: users };
};

// export const createUser = async (user) => {
//   await delay(500); // Simulated delay
//   const newUser = { ...user, id: users.length + 1 };
//   users.push(newUser); // This updates the mock API data
//   return { success: true, data: newUser };
// };

export const createUser = async (user) => {
  await delay(500); // Simulate network delay
  // Generate unique ID based on the highest current ID
  const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
  const newUser = { ...user, id: maxId + 1 };
  users.push(newUser); // Add new user to the mock database
  return { success: true, data: newUser };
};


export const updateUser = async (user) => {
  await delay(500);
  const index = users.findIndex((u) => u.id === user.id);
  if (index !== -1) {
    users[index] = user;
    return { success: true, data: user };
  }
  return { success: false, error: 'User not found' };
};

export const deleteUser = async (id) => {
  await delay(500);
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return { success: true };
  }
  return { success: false, error: 'User not found' };
};

// Role CRUD operations
export const getRoles = async () => {
  await delay(500); // Simulate network delay
  return { success: true, data: roles };
};

export const createRole = async (role) => {
  await delay(500);
  const newRole = { ...role, id: roles.length + 1 };
  roles.push(newRole);
  return { success: true, data: newRole };
};

export const updateRole = async (role) => {
  await delay(500);
  const index = roles.findIndex((r) => r.id === role.id);
  if (index !== -1) {
    roles[index] = role;
    return { success: true, data: role };
  }
  return { success: false, error: 'Role not found' };
};

export const deleteRole = async (id) => {
  await delay(500);
  const index = roles.findIndex((r) => r.id === id);
  if (index !== -1) {
    roles.splice(index, 1);
    return { success: true };
  }
  return { success: false, error: 'Role not found' };
};


