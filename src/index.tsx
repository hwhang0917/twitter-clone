import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import GlobalStyle from "./Styles/GlobalStyle";
import firebase from "./firebase";

const root = document.getElementById("root") as HTMLDivElement;

console.log(firebase);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  root
);
