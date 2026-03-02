import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteShell } from "@/components/site-shell";
import { ToastProvider } from "@/components/toast-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: "VR Consultancy – Study in USA Experts",
  description: "Premium USA study abroad counseling, university selection, and application support by VR Consultancy."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const whatsAppNumber = process.env.WHATSAPP_NUMBER;
  const adminKeyDefined = !!process.env.ADMIN_KEY;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            <SiteShell
              whatsAppNumber={whatsAppNumber}
              showAdminLink={adminKeyDefined || process.env.NODE_ENV !== "production"}
            >
              {children}
            </SiteShell>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

