
import { Toaster } from "sonner";
import { Navbar1 } from "@/components/navbar1";
import Footer from "@/components/modules/homepage/Footer";
import ChatBot from "@/components/ChatBot";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar1 className="justify-center items-center flex mx-auto px-2" />
      {children}
      <ChatBot />
      <Footer />
      <Toaster richColors />
    </div>
  );
}
