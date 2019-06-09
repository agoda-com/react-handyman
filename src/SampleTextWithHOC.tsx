import { I18nSelector } from "./useI18n";
import SampleText, { TranslationProps } from "./SampleText";
import withI18n from "./withI18n";

const mapI18nToProps = (i18n: I18nSelector): TranslationProps => ({
  translationText: i18n(
    "withHOC",
    "This is text injected with function via HOC"
  )
});

export default withI18n(SampleText, mapI18nToProps);
