import { initializeApp } from "@/lib/init";
import "./globals.css";

if (typeof window === 'undefined') {
  initializeApp().catch(console.error);
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}