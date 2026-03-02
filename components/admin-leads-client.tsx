"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Lead } from "@/lib/lead-schema";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "vr_leads";
const ADMIN_SESSION_KEY = "vr_admin_session";

interface AdminLeadsClientProps {
  adminKeyConfigured: boolean;
}

export function AdminLeadsClient({
  adminKeyConfigured
}: AdminLeadsClientProps) {
  const searchParams = useSearchParams();
  const [authenticated, setAuthenticated] = React.useState(false);
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [query, setQuery] = React.useState("");
  const [sourceFilter, setSourceFilter] = React.useState<string>("all");
  const [confirmClear, setConfirmClear] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const session = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (session === "ok") {
      setAuthenticated(true);
    }
  }, []);

  React.useEffect(() => {
    if (!adminKeyConfigured) {
      setAuthenticated(true);
      return;
    }
    if (!authenticated) return;
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const parsed: Lead[] = stored ? JSON.parse(stored) : [];
      parsed.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setLeads(parsed);
    } catch {
      setLeads([]);
    }
  }, [authenticated]);

  const filtered = leads.filter((lead) => {
    const matchesSource =
      sourceFilter === "all" ? true : lead.source === sourceFilter;
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.phone.toLowerCase().includes(q);
    return matchesSource && matchesQuery;
  });

  const handleExport = () => {
    if (typeof window === "undefined") return;
    const rows = [
      [
        "id",
        "createdAt",
        "source",
        "name",
        "email",
        "phone",
        "city",
        "preferredIntake",
        "interest",
        "notes",
        "pageUrl",
        "utm_source",
        "utm_medium",
        "utm_campaign"
      ],
      ...leads.map((l) => [
        l.id,
        l.createdAt,
        l.source,
        l.name,
        l.email,
        l.phone,
        l.city ?? "",
        l.preferredIntake ?? "",
        l.interest ?? "",
        (l.notes ?? "").replace(/\n/g, " "),
        l.pageUrl ?? "",
        l.utm?.source ?? "",
        l.utm?.medium ?? "",
        l.utm?.campaign ?? ""
      ])
    ];
    const csv = rows.map((r) =>
      r
        .map((v) => {
          const value = String(v ?? "");
          if (value.includes(",") || value.includes('"')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",")
    );
    const blob = new Blob([csv.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vr-leads-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
    setLeads([]);
    setConfirmClear(false);
  };

  if (!authenticated && adminKeyConfigured) {
    return (
      <div className="max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Admin access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This lightweight admin view is protected by a simple key. Ask your
              VR administrator for the current key.
            </p>
            <form
              className="space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const key = String(formData.get("key") ?? "");
                if (!key) return;
                const res = await fetch("/api/admin/verify-key", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ key })
                });
                const json = await res.json();
                if (json.ok) {
                  if (typeof window !== "undefined") {
                    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "ok");
                  }
                  setAuthenticated(true);
                } else {
                  alert("Invalid key");
                }
              }}
            >
              <Input
                name="key"
                type="password"
                placeholder="Enter admin key"
                autoComplete="off"
              />
              <Button type="submit" className="w-full">
                Enter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sources = Array.from(new Set(leads.map((l) => l.source)));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center">
          <Input
            placeholder="Search by name, email, or phone"
            className="md:max-w-xs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="mt-2 h-10 rounded-full border border-slate-200 bg-white px-4 text-xs text-slate-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 md:mt-0"
          >
            <option value="all">All sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={!leads.length}
          >
            Export CSV
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-300 dark:hover:bg-rose-900/40"
            onClick={() => setConfirmClear(true)}
            disabled={!leads.length}
          >
            Clear local leads
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full border-collapse text-left text-xs">
          <thead className="bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900/70 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Intake</th>
              <th className="px-4 py-3">Interest</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Page URL</th>
              <th className="px-4 py-3">UTM</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                className="border-t border-slate-100 text-[11px] text-slate-700 hover:bg-slate-50/60 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800/60"
              >
                <td className="px-4 py-2 align-top">
                  {new Date(lead.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 align-top">
                  <Badge variant="outline" className="text-[10px]">
                    {lead.source}
                  </Badge>
                </td>
                <td className="px-4 py-2 align-top">
                  <div className="font-medium">{lead.name}</div>
                  {lead.city && (
                    <div className="text-[10px] text-slate-500">{lead.city}</div>
                  )}
                </td>
                <td className="px-4 py-2 align-top">{lead.email}</td>
                <td className="px-4 py-2 align-top">{lead.phone}</td>
                <td className="px-4 py-2 align-top">{lead.city ?? "–"}</td>
                <td className="px-4 py-2 align-top">
                  {lead.preferredIntake ?? "–"}
                </td>
                <td className="px-4 py-2 align-top">
                  {lead.interest ? (
                    <span className="line-clamp-2">{lead.interest}</span>
                  ) : (
                    <span className="text-slate-400">–</span>
                  )}
                </td>
                <td className="px-4 py-2 align-top">
                  {lead.notes ? (
                    <span className="line-clamp-2">{lead.notes}</span>
                  ) : (
                    <span className="text-slate-400">–</span>
                  )}
                </td>
                <td className="px-4 py-2 align-top max-w-xs">
                  {lead.pageUrl ? (
                    <a
                      href={lead.pageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="line-clamp-2 text-[10px] text-brand-blue underline underline-offset-2"
                    >
                      {lead.pageUrl}
                    </a>
                  ) : (
                    <span className="text-slate-400">–</span>
                  )}
                </td>
                <td className="px-4 py-2 align-top max-w-xs">
                  {lead.utm ? (
                    <span className="text-[10px] text-slate-600 dark:text-slate-300">
                      {lead.utm.source && <span>src: {lead.utm.source} </span>}
                      {lead.utm.medium && <span>· med: {lead.utm.medium} </span>}
                      {lead.utm.campaign && (
                        <span>· camp: {lead.utm.campaign}</span>
                      )}
                    </span>
                  ) : (
                    <span className="text-slate-400">–</span>
                  )}
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td
                  className="px-4 py-6 text-center text-xs text-slate-400"
                  colSpan={8}
                >
                  No leads stored locally yet. Once visitors complete enquiry
                  forms, they will appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog defaultOpen={false}>
        {confirmClear && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Clear local leads?</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              This only clears leads stored in your browser&apos;s localStorage.
              Any records delivered to your webhook, email, or Google Sheets will
              not be affected.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setConfirmClear(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                className="bg-rose-600 hover:bg-rose-700"
                onClick={handleClear}
              >
                Clear local leads
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

