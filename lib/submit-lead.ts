"use client";

import { leadInputSchema, type LeadInput, type Lead } from "@/lib/lead-schema";

const STORAGE_KEY = "vr_leads";

function pushToLocalStorage(lead: Lead) {
  if (typeof window === "undefined") return;
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    const parsed: Lead[] = existing ? JSON.parse(existing) : [];
    parsed.unshift(lead);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // ignore
  }
}

function showToast(detail: {
  title: string;
  description?: string;
  variant: "success" | "error";
}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("vr-toast", {
      detail
    })
  );
}

export async function submitLead(input: LeadInput) {
  const validated = leadInputSchema.safeParse(input);
  if (!validated.success) {
    showToast({
      title: "Please check the form",
      description: "Some required details are missing or invalid.",
      variant: "error"
    });
    return { ok: false as const, error: validated.error.flatten() };
  }

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validated.data)
    });
    const json = await res.json();

    if (!res.ok || !json.ok) {
      showToast({
        title: "Unable to submit",
        description: "Something went wrong while sending your enquiry.",
        variant: "error"
      });
      return { ok: false as const, error: json?.error ?? json?.errors };
    }

    const now = new Date().toISOString();
    const lead: Lead = {
      ...validated.data,
      id: crypto.randomUUID(),
      createdAt: now
    };
    pushToLocalStorage(lead);

    showToast({
      title: "Thank you – we’ve received your details",
      description:
        "A VR counselor will review your profile and get in touch shortly.",
      variant: "success"
    });

    return { ok: true as const, lead };
  } catch (error) {
    console.error("[submitLead] error", error);
    showToast({
      title: "Network issue",
      description: "Please check your connection and try again.",
      variant: "error"
    });
    return { ok: false as const, error: "network" };
  }
}

