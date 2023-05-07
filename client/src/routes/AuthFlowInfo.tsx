import React from 'react';
import { useAuthStatus } from '../store/user';
import { Alert } from 'flowbite-react';

const UserAlerts = ({success, error}) => {
  return (
    <div>
      {success && (
        <Alert color="green">{success}</Alert>
      )}
      {error && (
        <Alert color="red">{error}</Alert>
      )}
    </div>
  );
};

export default UserAlerts;
