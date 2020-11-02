import React from "react";
import ReactDOM from "react-dom";
import App from "Components/App";
import GlobalStyle from "Styles/GlobalStyle";

const root = document.getElementById("root") as HTMLDivElement;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  root
);
