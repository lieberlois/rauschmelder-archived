import React, { useState, useContext } from "react";
import { IUser } from "../models/user";

interface IUserContext {
  readonly currentUser: User;
  readonly setCurrentUser: (user: User) => void;
}

type User = IUser | null;
const CurrentUserContext = React.createContext<IUserContext>({ currentUser: null, setCurrentUser: () => { } });

export function CurrentUserProvider(props: any) {
  const [currentUser, setCurrentUser] = useState<User>(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser(): IUserContext {
  return useContext(CurrentUserContext);
}