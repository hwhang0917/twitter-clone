import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "firebase";
import Home from "Routes/Home";
import Auth from "Routes/Auth";
import Profile from "Routes/Profile";
import Navigation from "Components/Navigation";

const AppRouter: React.FC<{
  isLoggedIn: boolean;
  userObj: firebase.User | null;
}> = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile />
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
};

export default AppRouter;
