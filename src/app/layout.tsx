import "./globals.css";
import { Inter } from "next/font/google";
import { Aside, AuthProvider, Footer, Header } from "@/components";

const inter = Inter({ weight: ["400"], subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Aside />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
