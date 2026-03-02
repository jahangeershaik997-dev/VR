"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/lib/submit-lead";

export function ContactForm() {
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim() || undefined;
    const preferredIntake =
      String(formData.get("preferredIntake") ?? "").trim() || undefined;
    const notes = String(formData.get("notes") ?? "").trim() || undefined;

    const pageUrl =
      typeof window !== "undefined" ? window.location.href : undefined;

    const utm = {
      source: searchParams.get("utm_source") ?? undefined,
      medium: searchParams.get("utm_medium") ?? undefined,
      campaign: searchParams.get("utm_campaign") ?? undefined
    };

    setLoading(true);
    await submitLead({
      source: "contact_page",
      name,
      email,
      phone,
      city,
      preferredIntake,
      interest: "contact",
      notes,
      pageUrl,
      utm
    });
    setLoading(false);
    event.currentTarget.reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <Input name="name" placeholder="Full name *" required />
        <Input
          name="email"
          type="email"
          placeholder="Email *"
          required
        />
        <Input name="phone" placeholder="Mobile / WhatsApp *" required />
        <Input name="city" placeholder="Current city" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          name="preferredIntake"
          placeholder="Preferred intake (e.g. Fall 2026)"
        />
      </div>
      <Textarea
        name="notes"
        placeholder="How can VR Consultancy support your US journey?"
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting…" : "Submit enquiry"}
      </Button>
    </form>
  );
}

