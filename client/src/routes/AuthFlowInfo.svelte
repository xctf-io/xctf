<script>
  import { authError, authSuccess } from '../store/user';
  import { onDestroy } from 'svelte';
  import { Alert } from 'flowbite-svelte';

  onDestroy(() => {
    authError.set(null);
    authSuccess.set(null);
  });
</script>

<div>
  {#if $authError}
    <Alert color="red">{$authError}</Alert>
  {/if}
  {#if $authSuccess}
    <Alert color="green">{$authSuccess}</Alert>
  {/if}
</div>

