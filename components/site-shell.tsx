"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { mainNav } from "@/data/navigation";

interface SiteShellProps {
  children: React.ReactNode;
  whatsAppNumber?: string;
  showAdminLink?: boolean;
}

export function SiteShell({
  children,
  whatsAppNumber,
  showAdminLink
}: SiteShellProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-red to-brand-blue text-white shadow-soft">
              <span className="text-sm font-semibold">VR</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-semibold">
                VR Consultancy
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Study in USA specialists
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-slate-900 dark:hover:text-slate-50",
                  isActive(item.href) &&
                    "text-slate-900 dark:text-slate-50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Link href="/apply">
              <Button size="sm">Apply now</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        {children}
      </main>
      <footer className="border-t border-slate-200/70 py-8 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 lg:flex-row lg:px-6">
          <p>
            © {new Date().getFullYear()} VR Consultancy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p>
              Premium USA-focused study abroad advisory with transparent, ethical
              guidance.
            </p>
            {showAdminLink ? (
              <Link
                href="/admin/leads"
                className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:border-slate-400 hover:text-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-100"
              >
                Admin
              </Link>
            ) : null}
          </div>
        </div>
      </footer>
      {whatsAppNumber ? (
        <a
          href={`https://wa.me/${encodeURIComponent(
            whatsAppNumber
          )}?text=${encodeURIComponent(
            "Hi VR Consultancy, I’m interested in studying in the USA. Please guide me."
          )}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-[#1ebe5b]"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Chat on WhatsApp</span>
        </a>
      ) : null}
    </div>
  );
}

