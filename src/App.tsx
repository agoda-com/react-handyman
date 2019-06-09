import React from "react";
import logo from "./logo.svg";
import "./App.css";
import I18n from "./I18n";
import withI18nProvider from "./withI18nProvider";
import useI18n from "./useI18n";
import SomeComponent from "./SomeComponent";
import SomeComponentHOC from "./SomeComponentHOC";

const translations = {
  learnReact: "Learn React",
  withFunction: "This is text injected with function",
  withFunctionTemplate: "This is text injected with function and {0}",
  withHOC: "This is done with HOC",
  withFormatting: "This is string with a {0}"
};

const App: React.FC = () => {
  const i18n = useI18n();
  return (
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
          <I18n k="learnReact">Learn React</I18n>{" "}
          <I18n k="withFormattingButDefaultValueUsed" args={[123]}>
            This is string with a placeholder {0}
          </I18n>
        </a>
        <SomeComponent
          propText={i18n(
            "withFunctionTemplate",
            "This is text injected with function and {0}",
            "a template formatting"
          )}
          translationText={i18n(
            "withFunction",
            "This is text injected with function"
          )}
        />
        <SomeComponentHOC
          propText={i18n("withFunction", "This is text injected with function")}
        />
      </header>
    </div>
  );
};

export default withI18nProvider(App, translations);
