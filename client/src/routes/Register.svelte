<!-- A Svelte register component that prompts the user for an username, email, and password -->
<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { register } from '../store/user';
    import AuthFlowInfo from './AuthFlowInfo.svelte';

    const dispatch = createEventDispatcher();

    let username = '';
    let email = '';
    let password = '';

    async function registerUser() {
        await register(username, email, password);
    }

    // focus the email input on mount
    onMount(() => {
        document.querySelector('input').focus();
    });
</script>

<div>
    <h1>Register</h1>

    <label for="username">Username</label>
    <input id="username" type="username" bind:value={username} />

    <label for="email">Email</label>
    <input id="email" type="email" bind:value={email} />

    <label for="password">Password</label>
    <input id="password" type="password" bind:value={password} />

    <button on:click={registerUser}>Register</button>
    <AuthFlowInfo />
</div>
