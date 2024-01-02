import "./globals.css";
import { inter } from "../fonts";
import { Metadata } from "next";
import Providers from "./Provider";
import Footer from "./_components/Footer";
import NavBar from "./_components/navbar";

export const metadata: Metadata = {
  title: "Danyal Ahmed",
  description: "Web dev and software engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={
          inter.className +
          " bg-standard-100 text-standard-900 dark:bg-standard-900 dark:text-standard-100"
        }
      >
        <Providers>
          <NavBar />
          <main className="mt-40 w-full md:mt-32">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
