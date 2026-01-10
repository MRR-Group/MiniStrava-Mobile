import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

const LANG_KEY = "app.lang";

export async function initI18n() {
  const saved = await AsyncStorage.getItem(LANG_KEY);

  const device = Localization.getLocales()?.[0]?.languageCode ?? "en";
  const lng = (saved || (device in resources ? device : "en")) as "pl" | "en";

  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      resources,
      lng,
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });
  } else {
    await i18n.changeLanguage(lng);
  }

  return lng;
}

export async function setAppLanguage(lng: "pl" | "en") {
  await AsyncStorage.setItem(LANG_KEY, lng);
  await i18n.changeLanguage(lng);
}

export function getCurrentLanguage(): "pl" | "en" {
  const lang = i18n.language ?? "en";
  return (lang.startsWith("pl") ? "pl" : "en") as "pl" | "en";
}
