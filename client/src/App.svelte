<script lang="ts">
    import { Router, Route } from "svelte-routing";

    import Navbar from "./components/Navbar.svelte";
    import Login from "./routes/Login.svelte";
    import Register from "./routes/Register.svelte";
    import Home from "./routes/Home.svelte";
    import type { NavLink } from "./types/nav";
    import { onMount } from "svelte";
    import { ctfg } from "./service";
    import { user } from "./store/user";
    import Evidence from "./routes/Evidence.svelte";

    onMount(async () => {
		try {
			const resp = await ctfg.CurrentUser({});
            user.set({
                username: resp.username,
            })
		} catch (e) {
			console.error(e);
		}
    });

    const links: NavLink[] = [
        { label: "Home", to: "/", Component: Home },
        { label: "Evidence", to: "/evidence", Component: Evidence },
        { label: "Login", to: "/login", Component: Login },
        {
            label: "Register",
            to: "/register",
            Component: Register,
        },
    ];
</script>

<main>
    <Router>
        <Navbar {links} />
        {#each links as link}
            <Route path={link.to} component={link.Component} />
        {/each}
    </Router>
</main>
