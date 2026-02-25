import * as React from "react";
import { createContext, useContext } from "react";
import { useCurrentUser } from "./useCurrentUser";

type UserGuardContextType = {
  user: any;
};

const UserGuardContext = createContext<UserGuardContextType | undefined>(
  undefined,
);

/**
 * Hook to access the logged in user from within a <UserGuard> component.
 */
export const useUserGuardContext = () => {
  const context = useContext(UserGuardContext);

  if (context === undefined) {
    throw new Error("useUserGuardContext must be used within a <UserGuard>");
  }

  return context;
};

/**
 * Demo-Version: Lässt alle Kinder immer rendern (kein Login-Check).
 */
export const UserGuard = (props: {
  children: React.ReactNode;
}) => {
  const { user } = useCurrentUser();

  return (
    <UserGuardContext.Provider value={{ user }}>
      {props.children}
    </UserGuardContext.Provider>
  );
};
