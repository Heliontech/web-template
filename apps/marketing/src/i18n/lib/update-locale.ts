"use server";

import { setLocaleCookie } from "./locale-cookie";
import { revalidatePath } from "next/cache";

export async function updateLocale(locale: string) {
  await setLocaleCookie(locale);
  revalidatePath("/");
}
