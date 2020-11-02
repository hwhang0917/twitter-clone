import React, { useState } from "react";
import AppRouter from "Components/Router";
import { authService } from "firebaseApp";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Twitter Clone</footer>
    </>
  );
};

export default App;
