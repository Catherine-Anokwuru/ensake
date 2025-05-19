import { ReactNode, use } from "react";
import { notFound } from "next/navigation";
import "../globals.css";

const locales = ["en", "de"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  if (!locales.includes(locale)) {
    notFound();
  }

  return <>{children}</>;
}
