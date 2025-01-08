import { redirect } from "next/navigation";

// default is english 404 page
export default function GlobalNotFound() {
  redirect("/en/404");
}
