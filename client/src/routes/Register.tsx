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
        <TextInput id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}>
          <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
        </TextInput>
      </div>

      <div className="mb-6">
        <Label htmlFor="password">Password</Label>
        <TextInput id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      <div className="mb-6">
        <Button onClick={() => registerUser(username, email, password)}>Register</Button>
      </div>
      <AuthFlowInfo />
    </div>
  );
};

export default Register;