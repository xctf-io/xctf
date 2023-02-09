<!-- A Svelte login component that prompts the user for an email and password -->
<script>
  import AuthFlowInfo from './AuthFlowInfo.svelte';

  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { login, authError, authSuccess } from '../store/user';

  const dispatch = createEventDispatcher();

  let email = '';
  let password = '';

  async function doLogin() {
    await login(email, password);
  }

  // focus the email input on mount
  onMount(() => {
    document.querySelector('input').focus();
  });
</script>

<div>
  <h1>Log in</h1>

  <label for="email">Email</label>
  <input id="email" type="email" bind:value={email} />

  <label for="password">Password</label>
  <input id="password" type="password" bind:value={password} />

  <button on:click={doLogin}>Log in</button>
  <AuthFlowInfo />
</div>
