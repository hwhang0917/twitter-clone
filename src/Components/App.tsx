import React, { useEffect, useState } from "react";
import AppRouter from "Components/Router";
import firebase from "firebase";
import { authService } from "firebaseApp";

const App: React.FC = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObject] = useState<firebase.User | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObject(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        <h1>Initializing...</h1>
      )}
      <footer>&copy; {new Date().getFullYear()} Twitter Clone</footer>
    </>
  );
};

export default App;
