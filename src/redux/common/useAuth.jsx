import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login, logout, update } from './authSlicer';

const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) {
        dispatch(login(parsedUser));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (authState.isLoggedIn) {
      localStorage.setItem('user', JSON.stringify(authState));
    } else {
      localStorage.removeItem('user');
    }
  }, [authState]);

  return authState;
};

export default useAuth;
