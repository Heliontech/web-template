import { redirect } from "next/navigation";

// default is english 404 page
// This implementation is for next-intl
export default function GlobalNotFound() {
  redirect("/en/404");
}
