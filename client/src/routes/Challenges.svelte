<!-- A Svelte component that renders a list of items in a table. Each item has a name, category, and a value. -->
<script>
import {onMount} from 'svelte';
import {ctfg} from "../service";
import {challenges} from "../store/challenges";

onMount(async () => {
    try {
        const resp = await ctfg.GetChallenges({});
        challenges.set(resp.challenges);
    } catch (e) {
        console.error(e);
        return;
    }
});

export function sort(key) {}
</script>

<table>
    <thead>
    <tr>
        <th><a href="#" on:click={() => sort('name')}>Name</a></th>
        <th><a href="#" on:click={() => sort('category')}>Category</a></th>
        <th><a href="#" on:click={() => sort('value')}>Value</a></th>
        <th><a href="#" on:click={() => sort('solved')}>Solved</a></th>
    </tr>
    </thead>
    <tbody>
    {#if $challenges}
        {#each $challenges as challenge}
            <tr>
                <td>{challenge.name}</td>
                <td>{challenge.category}</td>
                <td>{challenge.value}</td>
                <td>{challenge.solved}</td>
            </tr>
        {/each}
    {/if}
    </tbody>
</table>
