import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthStatus } from '../store/user';
import { Alert } from 'flowbite-react';

const UserAlerts = () => {
  const dispatch = useDispatch();
  const { success, setSuccess, error, setError } = useAuthStatus();
  const authErrorState = useSelector((state) => state.user.authError);
  const authSuccessState = useSelector((state) => state.user.authSuccess);

  useEffect(() => {
    return () => {
      dispatch(error);
      dispatch(success);
    };
  }, [dispatch]);

  return (
    <div>
      {authErrorState && (
        <Alert color="red">{authErrorState}</Alert>
      )}
      {authSuccessState && (
        <Alert color="green">{authSuccessState}</Alert>
      )}
    </div>
  );
};

export default UserAlerts;
