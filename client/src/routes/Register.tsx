import { useState } from "react";
import { createEventDispatcher } from 'svelte';
import { register } from '../store/user';
import AuthFlowInfo from './AuthFlowInfo.svelte';
import { Heading, Label, Input, Button } from 'flowbite-svelte';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser() {
    await register(username, email, password);
  }

  return (
    <div>
      <Heading tag="h2" class="text-center">Register</Heading>

      <div className="mb-6">
        <Label for="username">Username</Label>
        <Input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>

      <div className="mb-6">
        <Label for="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}>
          <svg slot="left" aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
        </Input>
      </div>

      <div className="mb-6">
        <Label for="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      <div className="mb-6">
        <Button onClick={registerUser}>Register</Button>
      </div>
      <AuthFlowInfo />
    </div>
  );
};

export default Register;