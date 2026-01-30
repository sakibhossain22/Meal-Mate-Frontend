
import { Toaster } from "sonner";
import "../globals.css";
import { Navbar1 } from "@/components/navbar1";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar1 className="justify-center items-center flex mx-auto px-2" />
      {children}
      <Toaster richColors />
    </div>
  );
}
