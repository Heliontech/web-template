import type { i18n } from "@pt/config";
import type messages from "./translations/en.json";

export type Messages = typeof messages;

export type Locale = keyof (typeof i18n)["locales"];
