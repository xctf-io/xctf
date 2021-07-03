import React from "react";

import { useStyletron } from "baseui";
import { Layer } from "baseui/layer";
import { ChevronDown, Delete, Overflow, Upload } from "baseui/icon";
import { AppNavBar, setItemActive, NavItemT } from "baseui/app-nav-bar";
import { useAuthContext } from "../context/AuthContext";

type ChildrenProps = {
  children?: React.ReactNode;
};

export default function PageLayout({ children }: ChildrenProps) {
  const [css] = useStyletron();
  const [mainItems, setMainItems] = React.useState<NavItemT[]>([
    { icon: Upload, label: "Primary A" },
    { icon: Upload, label: "Primary B" },
    {
      icon: ChevronDown,
      label: "Primary C",
      navExitIcon: Delete,
      children: [
        { icon: Upload, label: "Secondary A" },
        { icon: Upload, label: "Secondary B" },
        { icon: Upload, label: "Secondary C" },
        { icon: Upload, label: "Secondary D" },
      ],
    },
    {
      icon: ChevronDown,
      label: "Primary D",
      navExitIcon: Delete,
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
    },
  ]);
  const userItems = [
    { icon: Overflow, label: "Account item1" },
    { icon: Overflow, label: "Account item2" },
    { icon: Overflow, label: "Account item3" },
    { icon: Overflow, label: "Account item4" },
  ];

  function handleMainItemSelect(item: NavItemT) {
    setMainItems((prev) => setItemActive(prev, item));
  }

  const authContext = useAuthContext();

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
            title="CTFg"
            mainItems={mainItems}
            onMainItemSelect={handleMainItemSelect}
            onUserItemSelect={(item) => console.log("user", item)}
            userItems={authContext?.id ? userItems : undefined}
            username={authContext?.name || undefined}
            userImgUrl={authContext?.name ? "" : undefined}
          />
        </div>
      </Layer>

      {children}
    </React.Fragment>
  );
}
