import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user] = useState({
    name: "Charlotte",
    id: 123,
    avatar: "../src/img/1722287477960.jpeg"
  });

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
