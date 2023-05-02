import { useState } from "react";
import { Link } from "react-router-dom";
import { user } from "../store/user";
import type { NavLink } from "../types/nav";
import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
import { Button } from "flowbite-svelte";

interface NavbarProps {
  links: NavLink[];
}

const NavbarComponent = ({ links }: NavbarProps) => {
  const [path, updatePath] = useState(window.location.pathname);
  const userLoggedIn = user !== null;

  const logout = () => {
    document.cookie = "";
    user.set(null);
  };

  return (
    <Navbar>
      <NavBrand>CTFg</NavBrand>
      <NavHamburger />
      <NavUl>
        {links.map((l) => {
          if (
            (userLoggedIn && l.showWhenAuthed) ||
            (!userLoggedIn && !l.hideWhenUnauthed)
          ) {
            return (
              <NavLi active={l.to === path}>
                <Link
                  onClick={() => updatePath(l.to)}
                  to={l.to}
                >
                  <span>{l.label}</span>
                </Link>
              </NavLi>
            );
          }
        })}
        {user && (
          <>
            <NavLi>{user.username}</NavLi>
            <NavLi onClick={logout}>Logout</NavLi>
          </>
        )}
      </NavUl>
    </Navbar>
  );
};

export default NavbarComponent;