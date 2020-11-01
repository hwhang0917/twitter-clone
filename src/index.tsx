import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./Styles/GlobalStyle";
import firebase from "./firebase";

const root = document.getElementById("root") as HTMLDivElement;

console.log(firebase);

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  root
);
