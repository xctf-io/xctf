import React from "react";
import { Tabs } from "baseui/tabs-motion";
import { Tab } from "baseui/tabs";
import Challenges from "./Challenges/Challenges";

interface AdminPageProps {

}

export const AdminPage: React.FC<AdminPageProps> = (props) => {
  const [activeKey, setActiveKey] = React.useState("0");

  return (
    <>
      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => {
          setActiveKey(activeKey.toString());
        }}
        activateOnFocus
      >
        <Tab title="Challenges">
          <Challenges />
        </Tab>
        <Tab title="Teams">Content 1</Tab>
        <Tab title="Users">Content 1</Tab>
      </Tabs>
    </>
  );
};
