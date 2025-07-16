import { Montserrat } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

//Fonts----------------------------------------

const montserat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserat.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {/* {modal} */}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
