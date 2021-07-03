import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import App from "./App";
import Users from "./pages/Users";
import Teams from "./pages/Teams";
import Scoreboard from "./pages/Scoreboard";
import Challenges from "./pages/Challenges";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/users">
          <PageLayout>
            <Users />
          </PageLayout>
        </Route>
        <Route path="/teams">
          <PageLayout>
            <Teams />
          </PageLayout>
        </Route>
        <Route path="/scoreboard">
          <PageLayout>
            <Scoreboard />
          </PageLayout>
        </Route>
        <Route path="/challenges">
          <PageLayout>
            <Challenges />
          </PageLayout>
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
