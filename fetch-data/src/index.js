import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import DataFetcher from "./DataFetcher";

function App() {
  return (
    <div className="App">
      <h1>Welcome!</h1>
      <DataFetcher />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
