import type messages from "./translations/en.json";

export type Messages = typeof messages;

//  keyof (typeof i18n)["locales"];
export type Locale = string | number | symbol;
