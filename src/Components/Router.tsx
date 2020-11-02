import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "Routes/Home";
import Auth from "Routes/Auth";
import firebase from "firebase";

type currentUser = firebase.User | null;

const AppRouter: React.FC<{ isLoggedIn: currentUser }> = (isLoggedIn) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
