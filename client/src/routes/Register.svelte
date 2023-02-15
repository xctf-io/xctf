<!-- A Svelte register component that prompts the user for an username, email, and password -->
<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { register } from '../store/user';
    import AuthFlowInfo from './AuthFlowInfo.svelte';
    import { Heading, Label, Input, Button } from 'flowbite-svelte'

    let username = '';
    let email = '';
    let password = '';

    async function registerUser() {
        await register(username, email, password);
    }
</script>

<div>
    <Heading tag="h2" class="text-center">Register</Heading>

    <div class="mb-6">
        <Label for="username">Username</Label>
        <Input id="username" type="text" bind:value={username} />
    </div>

    <div class="mb-6">
        <Label for="email">Email</Label>
        <Input id="email" type="email" bind:value={email}>
            <svg slot="left" aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
        </Input>
    </div>

    <div class="mb-6">
        <Label for="password">Password</Label>
        <Input id="password" type="password" bind:value={password} />
    </div>

    <div class="mb-6">
        <Button on:click={registerUser}>Register</Button>
    </div>
    <AuthFlowInfo />
</div>
