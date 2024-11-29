import { v4 as uuidv4 } from 'uuid';

type User = {
  id: string;
  email: string;
  password: string;
};

let users: User[] = [
  { id: '1', email: 'samirah@gangat.com', password: '' },
  { id: '2', email: 'aslam@gangat.com', password: '' },
];

export const generatePassword = (email: string): string | null => {
  const user = users.find(u => u.email === email);
  if (user) {
    const newPassword = uuidv4().substr(0, 8);
    user.password = newPassword;
    return newPassword;
  }
  return null;
};

export const authenticate = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

