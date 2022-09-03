import React, { createContext, useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";

import auth from "../utils/auth";
// import { useNavigate } from "react-router-dom";

interface UserContextType {
  user: User | null;
  logIn: () => void;
  signOut: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  logIn: () => {},
  signOut: async () => {},
});

interface UserContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
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
        // navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setUser(null);
      });
  };

  return (
    <UserContext.Provider value={{ user, signOut, logIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
