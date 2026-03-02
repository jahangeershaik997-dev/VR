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

  const criticalCSS = `
    :root{--brand-red:#E84C3D;--brand-blue:#003580;--bg:#f8fafc;--fg:#0f172a;--muted:#64748b;--border:#e2e8f0}
    .dark{--bg:#020617;--fg:#f8fafc;--muted:#94a3b8;--border:#1e293b}
    body{background:var(--bg);color:var(--fg);font-family:var(--font-inter),system-ui,sans-serif;margin:0;-webkit-font-smoothing:antialiased}
    .font-display{font-family:var(--font-playfair),Georgia,serif}
    a{color:var(--brand-blue);text-decoration:none}
    a:hover{text-decoration:underline}
    button{font-family:inherit;cursor:pointer;border-radius:9999px;font-weight:500;transition:opacity .2s,background .2s}
    .min-h-screen{min-height:100vh}
    .max-w-6xl{max-width:72rem;margin-left:auto;margin-right:auto}
    .rounded-2xl,.rounded-3xl{border-radius:1rem}
    .rounded-3xl{border-radius:1.5rem}
    .shadow-soft{box-shadow:0 18px 45px rgba(15,23,42,.18)}
    .card-surface{background:rgba(255,255,255,.9);border-radius:1rem;border:1px solid var(--border);box-shadow:0 18px 45px rgba(15,23,42,.18)}
    .dark .card-surface{background:rgba(15,23,42,.9);border-color:#1e293b}
    .hero-gradient{background-image:radial-gradient(circle at top left,rgba(209,26,42,.16),transparent 55%),radial-gradient(circle at bottom right,rgba(11,61,145,.18),transparent 55%);background-color:rgba(255,255,255,.7);border:1px solid var(--border);border-radius:1.5rem;padding:2.5rem 1.5rem}
    .dark .hero-gradient{background-color:rgba(15,23,42,.7);border-color:#1e293b}
    .text-brand-red{color:var(--brand-red)}
    .text-brand-blue{color:var(--brand-blue)}
    .bg-brand-red{background-color:var(--brand-red)}
    .bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--brand-red),var(--brand-blue))}
    header{border-bottom:1px solid var(--border);background:rgba(255,255,255,.8);position:sticky;top:0;z-index:40}
    .dark header{background:rgba(2,6,23,.8);border-color:#1e293b}
    main{padding:2.5rem 1rem;max-width:72rem;margin-left:auto;margin-right:auto}
    footer{border-top:1px solid var(--border);padding:2rem 1rem;font-size:.75rem;color:var(--muted);max-width:72rem;margin-left:auto;margin-right:auto}
    [class*="inline-flex"][class*="rounded-full"]{display:inline-flex;align-items:center;justify-content:center;border-radius:9999px;font-size:.875rem;font-weight:500}
    [class*="from-brand-red"][class*="to-brand-blue"]{background:linear-gradient(to bottom right,var(--brand-red),var(--brand-blue));color:#fff}
    [class*="border-slate-200"][class*="bg-white"]{border:1px solid var(--border);background:#fff}
    .dark [class*="border-slate-200"]{border-color:#1e293b}
    .dark [class*="bg-slate-900"]{background:#0f172a}
  `.replace(/\s+/g, " ").trim();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
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

