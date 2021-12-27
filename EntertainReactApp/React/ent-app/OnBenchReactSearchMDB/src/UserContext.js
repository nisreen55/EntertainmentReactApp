import { createContext, useState } from "react";

export const UserContext = createContext({ name: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ title: '', auth: false });

  const login = (name) => {
    setUser((user) => ({
      name: name,
      auth: true,
    }));
    };
    const logout = () => {
        setUser((user) => ({
          name: '',
          auth: false,
        }));
      };
    return (
        <UserContext.Provider value={{ user, login, logout }}>
          {children}
        </UserContext.Provider>
      );
    };

