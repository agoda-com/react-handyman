import { I18nSelector } from "./useI18n";
import SomeComponent, { TranslationProps } from "./SomeComponent";
import withI18n from "./withI18n";

const mapI18nToProps = (i18n: I18nSelector): TranslationProps => ({
  translationText: i18n(
    "withHOC",
    "This is text injected with function via HOC"
  )
});

export default withI18n(SomeComponent, mapI18nToProps);
