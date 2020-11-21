import React, { useEffect, useState } from "react";
import AppRouter from "Components/Router";
import firebase from "firebase";
import { authService } from "firebaseApp";
import Loading from "./Loading";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObject] = useState<firebase.User | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObject(user);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        <Loading />
      )}
      <footer>&copy; {new Date().getFullYear()} Twitter Clone</footer>
    </>
  );
}

export default App;
