import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import PageLayout from "./layouts/PageLayout";
import Challenges from "./pages/challenges/Challenges";
import Scoreboard from "./pages/scoreboard/Scoreboard";
import Team from "./pages/team/Team";
import Teams from "./pages/teams/Teams";
import Users from "./pages/users/Users";
import { AccessCheck } from "./util/auth";
import { LoginPage } from "./pages/login/LoginPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <PageLayout>
            <LoginPage />
          </PageLayout>
        </Route>
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
