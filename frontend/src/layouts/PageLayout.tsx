import React from "react";

import { H5, Label4 } from "baseui/typography";
import { useStyletron } from "baseui";
import { Layer } from "baseui/layer";
import { ChevronDown, Upload } from "baseui/icon";
import { AppNavBar, setItemActive, NavItemT } from "baseui/app-nav-bar";
import { useAuthContext } from "../context/AuthContext";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faUsers,
  faBell,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Block } from "baseui/block";
import { Cell, Grid } from "baseui/layout-grid";

type PageLayoutProps = {
  children?: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  const [css] = useStyletron();
  const { push } = useHistory();
  const { pathname } = useLocation();
  const authContext = useAuthContext();

  const controlledNavItem = (
    label: string,
    route: string,
    overrides?: Partial<NavItemT>,
  ): NavItemT => ({
    label: label,
    active: route === pathname,
    info: {
      route,
    },
    ...overrides,
  });

  let navItems = [
    controlledNavItem("Users", "/users"),
    controlledNavItem("Teams", "/teams"),
    controlledNavItem("Scoreboard", "/scoreboard"),
    controlledNavItem("Challenges", "/challenges"),
  ];

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
    });
  }
  const [mainItems, setMainItems] = React.useState<NavItemT[]>(navItems);
  const userItems = [
    controlledNavItem("Notifications", "/notifications", {
      icon: () => <FontAwesomeIcon icon={faBell} />,
    }),
    controlledNavItem("Team", "/teams/me", {
      icon: () => <FontAwesomeIcon icon={faUsers} />,
    }),
    controlledNavItem("Profile", "/users/me", {
      icon: () => <FontAwesomeIcon icon={faUserCircle} />,
    }),
    controlledNavItem("Logout", "/logout", {
      icon: () => <FontAwesomeIcon icon={faSignOutAlt} />,
    }),
  ];

  function handleUserItemSelect(item: NavItemT) {
    if (item.info?.route) push(item.info.route);
  }

  function handleMainItemSelect(item: NavItemT) {
    if (item.info?.route) push(item.info.route);
    setMainItems((prev) => setItemActive(prev, item));
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
            title={
              <a onClick={() => push("/")}>
                {authContext?.config["ctf_name"] ? (
                  <>
                    <H5 display={"inline"} marginRight={"scale500"}>
                      {authContext?.config["ctf_name"]}
                    </H5>
                    <sub>
                      <Label4 display={"inline"}>with CTFg</Label4>
                    </sub>
                  </>
                ) : (
                  <H5 display={"inline"}>CTFg</H5>
                )}
              </a>
            }
            mainItems={mainItems}
            onMainItemSelect={handleMainItemSelect}
            onUserItemSelect={handleUserItemSelect}
            userItems={authContext?.current_user?.id ? userItems : undefined}
            username={authContext?.current_user?.name || undefined}
            userImgUrl={authContext?.current_user?.name ? "" : undefined}
          />
        </div>
      </Layer>
      <Block height={["80px"]} backgroundColor="background" />
      <Grid>
        <Cell skip={[0, 1, 1]} span={[4, 6, 10]}>
          {children}
        </Cell>
      </Grid>
    </React.Fragment>
  );
}
