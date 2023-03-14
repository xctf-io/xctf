<script lang="ts">
    import { Router, Route } from "svelte-routing";
    import snarkdown from 'snarkdown';

    import Navbar from "./components/Navbar.svelte";
    import Login from "./routes/Login.svelte";
    import Register from "./routes/Register.svelte";
    import Home from "./routes/Home.svelte";
    import type { NavLink } from "./types/nav";
    import { onMount } from "svelte";
    import { ctfg } from "./service";
    import { user } from "./store/user";
    import Evidence from "./routes/Evidence.svelte";
    import { pages } from "./store/pages";

    onMount(async () => {
		try {
			const resp = await ctfg.CurrentUser({});
            user.set({
                username: resp.username,
            });
            pages.set(resp.pages);
		} catch (e) {
            console.log(e);
		}
    });

    const links: NavLink[] = [
        {
            label: "Home",
            to: "/",
            Component: Home,
            showWhenAuthed: true,
        },
        {
            label: "Evidence",
            to: "/evidence",
            Component: Evidence,
            showWhenAuthed: true,
            hideWhenUnauthed: true,
        },
        {
            label: "Login",
            to: "/login",
            Component: Login,
            showWhenAuthed: false,
        },
        {
            label: "Register",
            to: "/register",
            Component: Register,
            showWhenAuthed: false,
        },
    ];
</script>

<main>
    <Router>
        <Navbar {links} />
        <div class="max-w-2xl px-6 py-16 mx-auto space-y-12">
            {#each links as link}
                <Route path={link.to} component={link.Component} />
            {/each}
            {#if $pages}
                {#each $pages as page}
                    <Route path={page.route}>
                        {@html snarkdown(page.content)}
                    </Route>
                {/each}
            {/if}
        </div>
    </Router>
</main>
