<script lang="ts">
    import { derived } from "svelte/store";
    import { Link } from "svelte-routing";
    import { user } from "../store/user";
    import type { NavLink } from "../types/nav";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
    import { Button } from 'flowbite-svelte'

    export let links: NavLink[] = [];
    let path: string = window.location.pathname;

    const updatePath = (newPath: string) => (path = newPath);

    const userLoggedIn = derived(user, user => user !== null);

    const logout = () => {
        document.cookie = '';
        user.set(null);
    }
</script>

<Navbar let:hidden let:toggle>
    <NavBrand>CTFg</NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
        {#each links as l}
            {#if ($userLoggedIn && l.showWhenAuthed) || (!$userLoggedIn && !l.hideWhenUnauthed)}
                <NavLi active={l.to == path}>
                    <Link
                        on:click={() => updatePath(l.to)}
                        to={l.to}
                    >
                        <span>{l.label}</span>
                    </Link>
                </NavLi>
            {/if}
        {/each}
        {#if $user}
            <NavLi>{$user.username}</NavLi>
            <NavLi on:click={logout}>Logout</NavLi>
        {/if}
    </NavUl>
</Navbar>