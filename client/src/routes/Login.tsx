import React from 'react';
import { useEffect, useState } from 'react';
import AuthFlowInfo from './AuthFlowInfo';

import { useLogin } from '../store/user';
import { Label, TextInput, Button } from 'flowbite-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [doLogin, success, error] = useLogin();

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
        <TextInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="mb-6">
        <Label htmlFor="password">Password</Label>
        <TextInput id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="mb-6">
        <Button onClick={() => doLogin(email, password)}>Log in</Button>
      </div>

      <AuthFlowInfo success={success} error={error}/>
    </div>
  );
};

export default Login;