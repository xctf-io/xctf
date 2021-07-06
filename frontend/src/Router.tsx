import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import PageLayout from "./layouts/PageLayout";
import Challenges from "./pages/Challenges";
import Scoreboard from "./pages/Scoreboard";
import Team from "./pages/Team";
import Teams from "./pages/Teams";
import Users from "./pages/Users";
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
        <Route
          path="/team/:id"
          children={
            <AccessCheck configKey={"account_visibility"}>
              <PageLayout>
                <Team />
              </PageLayout>
            </AccessCheck>
          }
        />

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
