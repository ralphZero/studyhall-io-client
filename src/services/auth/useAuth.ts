import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../utils/auth';
import { setCredentials, setAuthReady } from '../../features/auth/authSlice';
import { User } from '../../features/auth/interfaces';

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthReady({ isReady: false }));
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      dispatch(setAuthReady({ isReady: true }));

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
    });

    return () => {
      unsubscribe?.();
    };
  }, [dispatch]);
};
