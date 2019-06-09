import React from "react";
import logo from "./logo.svg";
import "./App.css";
import I18n from "./I18n";
import I18nProvider from "./I18nProvider";

const App: React.FC = () => {
  return (
    <I18nProvider translations={{ learnReact: "Learn React" }}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <I18n k="learnReact">Learn React</I18n>
          </a>
        </header>
      </div>
    </I18nProvider>
  );
};

export default App;
