import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Çitir Tavuk - самые насыщенные и хальяльные крышки",
  description: "Çitir Tavuk - это бренд, который специализируется на производстве самых насыщенных и хальяльных крышек для курицы. Мы предлагаем широкий ассортимент крышек, которые придают курице неповторимый вкус и аромат. Наши крышки изготовлены из высококачественных ингредиентов и соответствуют всем стандартам хальяльного производства. С Çitir Tavuk ваша курица будет всегда сочной, ароматной и вкусной!",

  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}