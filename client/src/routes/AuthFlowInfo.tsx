import React from 'react';
import { Text } from '@nextui-org/react';

const UserAlerts = ({success, error}) => {
  return (
    <div>
      {success && (
        <Text color="success">{success}</Text>
      )}
      {error && (
        <Text color="error">{error}</Text>
      )}
    </div>
  );
};

export default UserAlerts;
