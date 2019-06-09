import React from "react";
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
        <p>
          <I18n k="learnReact">Learn React</I18n>
        </p>
        <p>
          <I18n k="withFormattingButDefaultValueUsed" args={[123]}>
            This is string with a placeholder {0}
          </I18n>
        </p>

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
