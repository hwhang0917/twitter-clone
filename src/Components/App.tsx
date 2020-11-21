import React, { useEffect, useState } from "react";
import AppRouter from "Components/Router";
import firebase from "firebase";
import { authService } from "firebaseApp";
import Loading from "./Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const [userObj, setUserObject] = useState<firebase.User | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObject(user);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />;
}

export default App;
