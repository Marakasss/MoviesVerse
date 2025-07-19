import { Montserrat } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

//Fonts----------------------------------------

const montserat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserat",
  display: "swap",
});

//MetaData--------------------------------------

const imgUrl = "https://movies-verse-mocha.vercel.app/metadata.png";

export const metadata: Metadata = {
  title: "MoviesVerse",
  description: "A simple and efficient application for discovering movies.",
  keywords: [
    "movies",
    "movie finder",
    "movie database",
    "film",
    "cinema",
    "MoviesVerse",
  ],
  openGraph: {
    title: "MoviesVerse",
    description: "A simple and efficient application for discovering movies.",
    url: "https://movies-verse-mocha.vercel.app/",
    siteName: "MoviesVerse",

    images: [
      {
        url: imgUrl,
        width: 1200,
        height: 630,
        alt: "MoviesVerse",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoviesVerse",
    description: "A simple and efficient application for discovering movies.",
    images: [imgUrl],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserat.variable}>
        <TanStackProvider>
          <Toaster />

          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
