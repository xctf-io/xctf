import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import App from "./App";
import Users from "./pages/Users";
import Teams from "./pages/Teams";
import Scoreboard from "./pages/Scoreboard";
import Challenges from "./pages/Challenges";
import { AccessCheck } from "./util/auth";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/users">
          <AccessCheck configKey={"account_visibility"}>
            <PageLayout>
              <Users />
            </PageLayout>
          </AccessCheck>
        </Route>
        <Route path="/teams">
          <AccessCheck configKey={"account_visibility"}>
            <PageLayout>
              <Teams />
            </PageLayout>
          </AccessCheck>
        </Route>
        <Route path="/scoreboard">
          <AccessCheck configKey={"score_visibility"}>
            <PageLayout>
              <Scoreboard />
            </PageLayout>
          </AccessCheck>
        </Route>
        <Route path="/challenges">
          <AccessCheck configKey={"challenge_visibility"}>
            <PageLayout>
              <Challenges />
            </PageLayout>
          </AccessCheck>
        </Route>
        <Route path="/">
          <PageLayout>
            <App />
          </PageLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
