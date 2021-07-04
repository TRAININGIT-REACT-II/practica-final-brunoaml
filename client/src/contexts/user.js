import { createContext } from "react";

const User = createContext({
  current: "",
  update: () => {},
});

export default User;
