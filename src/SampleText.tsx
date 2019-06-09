import * as React from "react";

export interface BaseProps {
  propText: string;
}

export interface TranslationProps {
  translationText: string;
}

type Props = BaseProps & TranslationProps;

const SampleText: React.FC<Props> = props => {
  const { propText, translationText } = props;
  return (
    <>
      <p>{propText}</p>
      <p>{translationText}</p>
    </>
  );
};

export default SampleText;
