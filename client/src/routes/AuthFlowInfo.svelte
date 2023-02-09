<script>
  import { authError, authSuccess } from '../store/user';
  import { onDestroy } from 'svelte';

  onDestroy(() => {
    authError.set(null);
    authSuccess.set(null);
  });
</script>

<div>
  {#if $authError}
    <p>{$authError}</p>
  {/if}
  {#if $authSuccess}
    <p>{$authSuccess}</p>
  {/if}
</div>

