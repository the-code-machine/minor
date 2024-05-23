'use client'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login, logout } from './authSlicer';

const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(login(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (authState.isLoggedIn) {
      localStorage.setItem('user', JSON.stringify(authState.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [authState]);

  return authState;
};

export default useAuth;
