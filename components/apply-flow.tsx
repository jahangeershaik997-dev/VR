"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/lib/submit-lead";

type Step = "profile" | "review";

interface FormState {
  name: string;
  email: string;
  phone: string;
  city: string;
  preferredIntake: string;
  notes: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  city: "",
  preferredIntake: "",
  notes: ""
};

export function ApplyFlow() {
  const [step, setStep] = React.useState<Step>("profile");
  const [form, setForm] = React.useState<FormState>(initialState);
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const pageUrl =
      typeof window !== "undefined" ? window.location.href : undefined;

    const utm = {
      source: searchParams.get("utm_source") ?? undefined,
      medium: searchParams.get("utm_medium") ?? undefined,
      campaign: searchParams.get("utm_campaign") ?? undefined
    };

    setLoading(true);
    await submitLead({
      source: "apply_flow",
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city || undefined,
      preferredIntake: form.preferredIntake || undefined,
      interest: "full_application",
      notes: form.notes || undefined,
      pageUrl,
      utm
    });
    setLoading(false);
    setForm(initialState);
    setStep("profile");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 text-xs font-medium">
        <div className="flex items-center gap-2">
          <div className={`h-6 w-6 rounded-full text-center text-[11px] leading-6 ${step === "profile" ? "bg-brand-red text-white" : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100"}`}>
            1
          </div>
          <span>Profile details</span>
        </div>
        <div className="h-px flex-1 self-center bg-slate-200 dark:bg-slate-700" />
        <div className="flex items-center gap-2">
          <div className={`h-6 w-6 rounded-full text-center text-[11px] leading-6 ${step === "review" ? "bg-brand-blue text-white" : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100"}`}>
            2
          </div>
          <span>Review &amp; submit</span>
        </div>
      </div>

      {step === "profile" ? (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              name="name"
              placeholder="Full name *"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              name="phone"
              placeholder="Mobile / WhatsApp *"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <Input
              name="city"
              placeholder="Current city"
              value={form.city}
              onChange={handleChange}
            />
          </div>
          <Input
            name="preferredIntake"
            placeholder="Target intake (e.g. Fall 2026)"
            value={form.preferredIntake}
            onChange={handleChange}
          />
          <Textarea
            name="notes"
            placeholder="Briefly describe your academic background, tests (GRE/IELTS/TOEFL), and budget."
            value={form.notes}
            onChange={handleChange}
          />
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => setStep("review")}
              disabled={!form.name || !form.email || !form.phone}
            >
              Continue to review
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100">
            <div className="mb-2 font-medium text-slate-900 dark:text-slate-50">
              Final review
            </div>
            <dl className="grid gap-2 text-xs md:grid-cols-2">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Name</dt>
                <dd>{form.name}</dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Email</dt>
                <dd>{form.email}</dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Phone</dt>
                <dd>{form.phone}</dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">City</dt>
                <dd>{form.city || "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  Target intake
                </dt>
                <dd>{form.preferredIntake || "—"}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-slate-500 dark:text-slate-400">
                  Background &amp; goals
                </dt>
                <dd>{form.notes || "—"}</dd>
              </div>
            </dl>
          </div>
          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("profile")}
              disabled={loading}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting application…" : "Submit application details"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

