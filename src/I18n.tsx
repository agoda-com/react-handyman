import * as React from "react";
import TranslationsContext from "./TranslationsContext";

interface Props {
  k: string;
}

const I18n: React.FC<Props> = props => {
  const { children, k } = props;
  const translations = React.useContext(TranslationsContext);

  return <>{translations[k] ? translations[k] : children}</>;
};

export default I18n;
