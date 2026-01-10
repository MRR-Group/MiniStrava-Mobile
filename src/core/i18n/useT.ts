import { useTranslation } from "react-i18next";
import type { I18nKey } from "./keys";

export function useT() {
  const { t, i18n } = useTranslation();

  return {
    t: (key: I18nKey, options?: any) => t(key, options) as string,
    lang: i18n.language,
  };
}
