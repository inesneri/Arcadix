import { createContext } from "react";

const SessionContext = createContext({
  session: null,
  setSession: () => {},
});

export default SessionContext;
