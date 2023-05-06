import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../store/user";
import type { NavLink } from "../types/nav";
import { Navbar, Button } from "flowbite-react";

interface NavbarProps {
  links: NavLink[];
}

const NavbarComponent = ({ links }: NavbarProps) => {
  const [path, updatePath] = useState(window.location.pathname);
  const { user, setUser, logout } = useUser();
  const userLoggedIn = !!user;

  return (
    <Navbar>
      <Navbar.Brand>CTFg</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {links.map((l) => {
          if (
            (userLoggedIn && l.showWhenAuthed) ||
            (!userLoggedIn && !l.hideWhenUnauthed)
          ) {
            return (
              <Navbar.Link active={l.to === path}>
                <Link
                  onClick={() => updatePath(l.to)}
                  to={l.to}
                >
                  <span>{l.label}</span>
                </Link>
              </Navbar.Link>
            );
          }
        })}
        {user && (
          <>
            <Navbar.Link>{user.username}</Navbar.Link>
            <Navbar.Link onClick={logout}>Logout</Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;