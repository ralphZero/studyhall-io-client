import React, { createContext, useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";

import auth from "../utils/auth";
// import { useNavigate } from "react-router-dom";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  logIn: () => void;
  signOut: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  logIn: () => {},
  signOut: async () => {},
});

interface UserContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setIsLoading(false);
    });
    return () => {
        unsubscribe?.()
    }
}, []);

  const signOut = () => auth.signOut();

  const logIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        console.error(err);
        setUser(null);
      });
  };

  return (
    <UserContext.Provider value={{ user, signOut, logIn, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
