import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./libs/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import SuspenseWrapper from "./components/SuspenseWrapper";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SuspenseWrapper>
          <ClientOnly>
            <SearchModal />
            <RentModal />
            <LoginModal />
            <RegisterModal />
          </ClientOnly>
        </SuspenseWrapper>
        <SuspenseWrapper>
          <Navbar currentUser={currentUser} />
        </SuspenseWrapper>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}

// i Used this client only component because of the <Map /> client component, which causes some kinf of error on the package used there, because its being rendered on the server on initial render.
