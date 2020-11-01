import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./Styles/GlobalStyle";

const root = document.getElementById("root") as HTMLDivElement;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  root
);
