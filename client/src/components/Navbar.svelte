<script lang="ts">
    import { Link } from "svelte-routing";
    import { user } from "../store/user";
    import type { NavLink } from "../types/nav";

    export let links: NavLink[] = [];
    let path: string = window.location.pathname;

    const updatePath = (newPath: string) => (path = newPath);
</script>

<div class="navbar">
    <div class="logo">CTFg</div>
    <div>{$user?.username}</div>
    <div class="menu">
        {#each links as l}
            <div class="link">
                <Link
                    on:click={() => updatePath(l.to)}
                    to={l.to}
                >
                    <span>{l.label}</span>
                </Link>
            </div>
        {/each}
    </div>
</div>

<style>
    .navbar {
        display: flex;
        flex-direction: row;
        min-height: 100px;
        width: 100%;
        justify-content: center;
        align-items: center;
        align-content: center;
    }

    .logo {
        display: flex;
        width: 30%;
    }

    .menu {
        display: flex;
        width: 70%;
    }

    .link {
        padding: 1em;
    }
</style>