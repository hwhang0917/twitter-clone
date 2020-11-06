import React, { useEffect, useState } from "react";
import AppRouter from "Components/Router";
import { authService } from "firebaseApp";

const App: React.FC = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : <h1>Initializing...</h1>}
      <footer>&copy; {new Date().getFullYear()} Twitter Clone</footer>
    </>
  );
};

export default App;
