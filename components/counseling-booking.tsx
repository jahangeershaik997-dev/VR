"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/lib/submit-lead";

const slots = [
  "This week – Evening (7–9 PM IST)",
  "This week – Afternoon (3–6 PM IST)",
  "Weekend – Morning (10–1 PM IST)"
];

export function CounselingBooking() {
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const slot = String(formData.get("slot") ?? "").trim();

    const pageUrl =
      typeof window !== "undefined" ? window.location.href : undefined;

    const utm = {
      source: searchParams.get("utm_source") ?? undefined,
      medium: searchParams.get("utm_medium") ?? undefined,
      campaign: searchParams.get("utm_campaign") ?? undefined
    };

    setLoading(true);
    await submitLead({
      source: "counseling_booking",
      name,
      email,
      phone,
      city: undefined,
      preferredIntake: slot,
      interest: "counseling_session",
      notes: undefined,
      pageUrl,
      utm
    });
    setLoading(false);
    event.currentTarget.reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-3">
        <Input name="name" placeholder="Full name *" required />
        <Input
          name="email"
          type="email"
          placeholder="Email *"
          required
        />
        <Input name="phone" placeholder="Mobile / WhatsApp *" required />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <select
          name="slot"
          required
          className="h-10 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          <option value="">Select a preferred slot *</option>
          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Booking counseling…" : "Book counseling session"}
      </Button>
    </form>
  );
}

