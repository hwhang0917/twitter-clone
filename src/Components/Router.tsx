import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "firebase";
import Home from "Routes/Home";
import Auth from "Routes/Auth";
import Profile from "Routes/Profile";
import Navigation from "Components/Navigation";

type _Props = {
  isLoggedIn: boolean;
  userObj: firebase.User | null;
};

function AppRouter({ isLoggedIn, userObj }: _Props) {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;
