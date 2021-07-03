import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import App from "./App";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <PageLayout>
            <App />
          </PageLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
