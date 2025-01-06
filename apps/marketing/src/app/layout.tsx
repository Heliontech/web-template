import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    absolute: "portal template marketing - Application",
    default: "portal template marketing - Application",
    template: "%s | portal template marketing - Application",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return children;
}
