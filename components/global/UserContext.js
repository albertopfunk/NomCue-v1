import React, { useState, createContext } from "react";

export const UserContext = createContext(null);

export function UserContextProvider(props) {
  const [location, setLocation] = useState(null);

  return (
    <UserContext.Provider value={{ location, setLocation }}>
      {props.children}
    </UserContext.Provider>
  );
}
