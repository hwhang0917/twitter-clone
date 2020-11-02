import React, { useState } from "react";
import AppRouter from "Components/Router";
import firebase from "firebaseApp";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Twitter Clone</footer>
    </>
  );
};

export default App;
