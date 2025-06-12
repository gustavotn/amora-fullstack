import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TbBackground } from "react-icons/tb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amora 💖",
  description: "Amora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <footer style={{ background: '#0D0D12' }} className="mt-8 p-6 rounded-xl shadow-md">
        <div className="flex flex-col items-center space-y-2 text-center text-sm text-gray-700">
          <p>
        Ao acessar nosso site, você concorda com os{' '}
        <a
          href="/termos-de-uso"
          target="_blank"
          rel="noopener noreferrer"
          className=" font-semibold"
        >
          Termos de Uso
        </a>.
          </p>

          <p>
        Desenvolvido por <span className="font-bold">Open Help</span>
          </p>

          <p>
        Contato para suporte:{' '}
        <a
          href="mailto:openhelp2025@gmail.com"
          className="font-semibold"
        >
          openhelp2025@gmail.com
        </a>
          </p>
        </div>
      </footer>
    </html>
  );
}
