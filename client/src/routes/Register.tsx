import React from "react";
import { useState } from "react";
import { useRegister } from '../store/user';
import AuthFlowInfo from './AuthFlowInfo';
import { Label, TextInput, Button } from 'flowbite-react';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = useRegister()[0];

  return (
    <div>
      <h2 className="text-center">Register</h2>

      <div className="mb-6">
        <Label htmlFor="username">Username</Label>
        <TextInput id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>

      <div className="mb-6">
        <Label htmlFor="email">Email</Label>
        <TextInput id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div className="mb-6">
        <Label htmlFor="password">Password</Label>
        <TextInput id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      <div className="mb-6">
        <Button onClick={() => registerUser(username, email, password)}>Register</Button>
      </div>
      {/* <AuthFlowInfo /> */}
    </div>
  );
};

export default Register;