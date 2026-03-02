import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "VR Consultancy · Study in USA"
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="hero-gradient rounded-3xl border border-slate-200 bg-white/70 px-6 py-10 shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
        <div className="max-w-xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
            Study in the United States
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 md:text-4xl">
            Premium, end-to-end US counseling for serious applicants.
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            VR Consultancy helps driven students design a realistic, high-impact
            US admissions strategy—from shortlisting to scholarships and visas.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/apply">
              <Button size="lg">Start application</Button>
            </Link>
            <Link href="/counseling">
              <Button variant="outline" size="lg">
                Book counseling
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="space-y-1 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Programs
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Explore indicative US programs across STEM, business, and more.
            </p>
            <Link
              href="/programs"
              className="text-xs font-semibold text-brand-blue underline underline-offset-4"
            >
              Browse programs
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-1 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Counseling
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Book a 1:1 profile evaluation and roadmap session.
            </p>
            <Link
              href="/counseling"
              className="text-xs font-semibold text-brand-blue underline underline-offset-4"
            >
              View counseling options
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-1 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Contact
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Reach out to the VR team with specific questions.
            </p>
            <Link
              href="/contact"
              className="text-xs font-semibold text-brand-blue underline underline-offset-4"
            >
              Contact VR Consultancy
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

