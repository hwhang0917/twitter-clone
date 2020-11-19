import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppRouter from "Components/Router";
import firebase from "firebase";
import { authService } from "firebaseApp";

const BodyWrapper = styled.div`
  margin: 15px;
`;

// ---- STYLE END ----

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
    <BodyWrapper>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        <h1>Initializing...</h1>
      )}
      <footer>&copy; {new Date().getFullYear()} Twitter Clone</footer>
    </BodyWrapper>
  );
}

export default App;
