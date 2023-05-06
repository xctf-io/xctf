import React from 'react';
import { useEffect, useState } from 'react';
import AuthFlowInfo from './AuthFlowInfo';

import { useLogin } from '../store/user';
import { Label, TextInput, Button } from 'flowbite-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = useLogin()[0];

  // focus the email input on mount
  useEffect(() => {
    document.querySelector('input')?.focus();
  }, []);

  return (
    <div>
      <h2 className="text-center">
        Log in
      </h2>

      <div className="mb-6">
        <Label htmlFor="email">Email</Label>
        <TextInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}>
          <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </TextInput>
      </div>

      <div className="mb-6">
        <Label htmlFor="password">Password</Label>
        <TextInput id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="mb-6">
        <Button onClick={() => doLogin(email, password)}>Log in</Button>
      </div>

      <AuthFlowInfo />
    </div>
  );
};

export default Login;