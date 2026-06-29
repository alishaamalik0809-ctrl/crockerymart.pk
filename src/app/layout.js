import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "CrockeryMart.pk | Premium Crockery & Kitchenware Online Store Pakistan",
  description: "Premium Crockery Delivered to Your Door. 100% Original Quality. Fast Nationwide Delivery within 24-48 Hours. Shop luxury dinner sets, plates, tea cups, and stoneware bowls at the best prices.",
  keywords: "crockery pakistan, dinner set karachi, kitchenware online lahore, ceramic plates islamabad, tea cups, serving bowls, crockerymart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} h-full`}>
      <body className="font-body text-gray-800 bg-[#F5F5F5] min-h-full flex flex-col antialiased">
        <StoreProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
