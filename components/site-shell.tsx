"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Phone,
  Search,
  MessageCircle,
  Moon,
  Sun,
  X,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube
} from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const phoneDisplay = "+91 90000 00000";
  const whatsappDisplay =
    whatsAppNumber && whatsAppNumber.trim().length > 0
      ? `WhatsApp: ${whatsAppNumber}`
      : "WhatsApp: +91 90000 00000";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Top utility bar */}
      <div className="bg-slate-900 text-[11px] text-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 lg:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Phone className="h-3 w-3 text-emerald-400" />
              <span>{phoneDisplay}</span>
            </span>
            <span className="hidden items-center gap-1 sm:inline-flex">
              <MessageCircle className="h-3 w-3 text-emerald-400" />
              <span>{whatsappDisplay}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-slate-300 hover:text-white">
              Login
            </button>
            <span className="h-3 w-px bg-slate-600" />
            <button className="text-slate-300 hover:text-white">
              Signup
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-red to-brand-blue text-white shadow-soft">
              <span className="text-sm font-semibold">VR</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
                VR Consultancy
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Study in USA specialists
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-700 md:flex lg:text-sm">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-brand-blue",
                  isActive(item.href) && "text-brand-blue"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-brand-blue hover:text-brand-blue dark:border-slate-700 dark:text-slate-300 md:inline-flex"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              aria-label="Toggle dark mode"
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-brand-blue hover:text-brand-blue dark:border-slate-700 dark:text-slate-300 md:inline-flex"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:border-brand-blue hover:text-brand-blue dark:border-slate-700 dark:text-slate-200 md:hidden"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 md:hidden">
            <div className="flex flex-col gap-3">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "py-1",
                    isActive(item.href) && "font-semibold text-brand-blue"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-6 border-t border-slate-200 bg-slate-950 py-10 text-xs text-slate-300 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:flex-row lg:gap-10 lg:px-6">
          <div className="space-y-3 lg:max-w-xs">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-red to-brand-blue text-white">
                <span className="text-xs font-semibold">VR</span>
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-white">
                  VR Consultancy
                </div>
                <div className="text-[11px] text-slate-400">
                  Study in USA specialists
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Premium USA-focused study abroad advisory with transparent, ethical
              guidance from first enquiry to visa.
            </p>
          </div>
          <div className="grid flex-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <FooterColumn
              title="About"
              links={[
                { label: "About VR Consultancy", href: "/about" },
                { label: "Our counseling approach", href: "/services" },
                { label: "Success stories", href: "/resources" }
              ]}
            />
            <FooterColumn
              title="Services"
              links={[
                { label: "Migrate", href: "/migrate" },
                { label: "Work", href: "/work" },
                { label: "Study", href: "/study-in-usa" },
                { label: "Visit & visas", href: "/visa" },
                { label: "Counseling", href: "/counseling" }
              ]}
            />
            <FooterColumn
              title="Resources"
              links={[
                { label: "Blog & articles", href: "/resources" },
                { label: "FAQs", href: "/resources" },
                { label: "University guides", href: "/universities" }
              ]}
            />
            <div className="space-y-3">
              <div className="font-semibold text-slate-100">Contact</div>
              <div className="space-y-2 text-[11px] text-slate-400">
                <div>
                  <div className="font-semibold text-slate-200">India</div>
                  <div>Phone: {phoneDisplay}</div>
                  <div>Email: hello@vr-consultancy.example</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-slate-100">Follow</div>
                <div className="flex gap-2">
                  {[Facebook, Instagram, Linkedin, Twitter, Youtube].map(
                    (Icon, idx) => (
                      <span
                        key={idx}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-slate-300 hover:bg-slate-800"
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-slate-100">
                  Newsletter
                </div>
                <form
                  className="flex gap-1"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    type="email"
                    placeholder="Email address"
                    className="h-8 flex-1 rounded-full border border-slate-700 bg-slate-900 px-3 text-[11px] text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-blue"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-8 items-center justify-center rounded-full bg-brand-blue px-3 text-[11px] font-semibold text-white hover:bg-brand-blue/90"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-4">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-[11px] text-slate-500 sm:flex-row lg:px-6">
            <p>
              © {new Date().getFullYear()} VR Consultancy. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/legal/privacy">Privacy Policy</Link>
              <span>|</span>
              <Link href="/legal/terms">Terms</Link>
              <span>|</span>
              <Link href="/legal/refund">Refund Policy</Link>
              <span>|</span>
              <Link href="/sitemap">Sitemap</Link>
              {showAdminLink && (
                <>
                  <span>|</span>
                  <Link href="/admin/leads">Admin</Link>
                </>
              )}
            </div>
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

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-2">
      <div className="font-semibold text-slate-100">{title}</div>
      <ul className="space-y-1 text-[11px] text-slate-400">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-slate-200">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

