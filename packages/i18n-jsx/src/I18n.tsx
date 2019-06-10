import * as React from "react";
import useI18n from "./useI18n";

interface Props {
  k: string;
  args?: (string | number)[];
}

const I18n: React.FC<Props> = props => {
  const { children, k, args } = props;
  const i18n = useI18n();
  const argsParsed = args ? args! : ([] as (string | number)[]);

  return <>{i18n(k, children as string, ...argsParsed)}</>;
};

export default I18n;
