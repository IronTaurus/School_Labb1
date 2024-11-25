import { useState, createContext } from "react";
const UserContext = createContext()

const User = () => {
  const [user, setUser] = useState("Användare 1");
  return (
    <UserContext.Provider value={user}>
      <h1>{`Hej ${user}!`}</h1>
    </UserContext.Provider>
  );
}

export default User;

