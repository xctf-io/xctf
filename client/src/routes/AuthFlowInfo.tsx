import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { authError, authSuccess } from '../store/user';
import { Alert } from 'flowbite-react';

const UserAlerts = () => {
  const dispatch = useDispatch();
  const authErrorState = useSelector((state: RootState) => state.user.authError);
  const authSuccessState = useSelector((state: RootState) => state.user.authSuccess);

  useEffect(() => {
    return () => {
      dispatch(authError(null));
      dispatch(authSuccess(null));
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
