import { useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import auth from '../../utils/auth';
import { setCredentials, setAuthReady } from '../../features/auth/authSlice';
import { User } from '../../features/auth/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const useFirebaseAuth = () => {
  const dispatch = useDispatch();

  const prepareUserResponse = useCallback(
    async (currentUser: any) => {
      let token: string | null = null;
      let user: User | null = null;

      if (currentUser) {
        token = await currentUser.getIdToken();
        user = {
          displayName: currentUser.displayName as string,
          email: currentUser.email as string,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL as string,
        };
      }

      dispatch(
        setCredentials({
          user,
          token,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(setAuthReady({ isReady: false }));
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setAuthReady({ isReady: true }));
      prepareUserResponse(currentUser);
    });

    return () => {
      unsubscribe?.();
    };
  }, [dispatch, prepareUserResponse]);

  const signOut = () => {
    auth.signOut();
    prepareUserResponse(null);
  };

  const logIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        prepareUserResponse(result.user);
      })
      .catch((err) => {
        prepareUserResponse(null);
      });
  };

  const { user, isReady } = useSelector((store: RootState) => store.auth);

  return { user, isReady, signOut, logIn };
};
