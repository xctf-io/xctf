import React from "react";

import { useStyletron } from "baseui";
import { Layer } from "baseui/layer";
import { ChevronDown, Delete, Overflow, Upload } from "baseui/icon";
import { AppNavBar, setItemActive, NavItemT } from "baseui/app-nav-bar";
import { useAuthContext } from "../context/AuthContext";
import { useHistory, useLocation } from "react-router-dom";
import { NavItem } from "baseui/side-navigation";

type PageLayoutProps = {
  children?: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  const [css] = useStyletron();
  const { push } = useHistory();
  const { pathname } = useLocation();
  const authContext = useAuthContext();

  const controlledNavItem = (label: string, route: string, overrides?: NavItemT): NavItemT => (
    {
      label: label,
      active: route === pathname,
      info: {
        route,
      },
      ...overrides,
    }
  );

  var navItems = [
    controlledNavItem("Users", "/users"),
    controlledNavItem("Teams", "/teams"),
    controlledNavItem("Scoreboard", "/scoreboard"),
    controlledNavItem("Challenges", "/challenges"),
  ]

  if (authContext.current_user?.type === "admin") {
    navItems.push({
      icon: ChevronDown,
      label: "Admin",
      children: [
        {
          icon: ChevronDown,
          label: "Secondary E",
          children: [
            { icon: Upload, label: "Tertiary A" },
            { icon: Upload, label: "Tertiary B" },
          ],
        },
        { icon: Upload, label: "Secondary F" },
      ],
    })
  }
  const [mainItems, setMainItems] = React.useState<NavItemT[]>(navItems);
  const userItems = [
    { icon: Overflow, label: "Account item1" },
    { icon: Overflow, label: "Account item2" },
    { icon: Overflow, label: "Account item3" },
    { icon: Overflow, label: "Account item4" },
  ];

  function handleMainItemSelect(item: NavItemT) {
    if (item.info?.route) {
      push(item.info.route);
    }else{
      setMainItems((prev) => setItemActive(prev, item));
    }
  }

  return (
    <React.Fragment>
      <Layer>
        <div
          className={css({
            boxSizing: "border-box",
            width: "100vw",
            position: "fixed",
            top: "0",
            left: "0",
          })}
        >
          <AppNavBar
            title={authContext?.config["ctf_name"] || "CTFg"}
            mainItems={mainItems}
            onMainItemSelect={handleMainItemSelect}
            onUserItemSelect={(item) => console.log("user", item)}
            userItems={authContext?.current_user?.id ? userItems : undefined}
            username={authContext?.current_user?.name || undefined}
            userImgUrl={authContext?.current_user?.name ? "" : undefined}
          />
        </div>
      </Layer>

      {children}
    </React.Fragment>
  );
}
