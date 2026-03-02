import Link from "next/link";
import { GraduationCap, MapPinned, PhoneCall, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "VR Consultancy · Study in USA"
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="hero-gradient flex flex-col gap-8 rounded-3xl shadow-soft md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
            Study in the United States
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 md:text-4xl">
            Premium, end-to-end US counseling for serious applicants.
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            VR Consultancy helps you move from interest to admit with structured
            shortlisting, application strategy, essays, interviews, and visa
            guidance—built specifically for US universities.
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
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Designed for undergraduates, master&apos;s, and MBA aspirants who want a
            realistic, high-quality US admissions plan.
          </p>
        </div>
        <div className="card-surface max-w-sm space-y-4 border border-slate-200/80 px-6 py-5 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
            What can we help you with today?
          </p>
          <div className="grid gap-3">
            <HomeQuickLink
              icon={<GraduationCap className="h-4 w-4 text-brand-red" />}
              title="Plan my US degree"
              description="Profile evaluation, university tiers, and funding conversation."
              href="/study-in-usa"
            />
            <HomeQuickLink
              icon={<ScrollText className="h-4 w-4 text-brand-blue" />}
              title="Explore programs"
              description="See indicative programs across STEM, business, and more."
              href="/programs"
            />
            <HomeQuickLink
              icon={<PhoneCall className="h-4 w-4 text-brand-red" />}
              title="Speak to a counselor"
              description="Book a focused 30–45 minute discovery session."
              href="/counseling"
            />
            <HomeQuickLink
              icon={<MapPinned className="h-4 w-4 text-brand-blue" />}
              title="Shortlist universities"
              description="Get a realistic mix of dream, target, and safe options."
              href="/universities"
            />
          </div>
        </div>
      </section>

      {/* Service tiles */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          US journey with VR Consultancy
        </h2>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Inspired by large immigration portals but focused purely on the US,
          VR breaks your journey into clear, guided stages.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-red/10 text-[11px] font-semibold text-brand-red">
                  1
                </span>
                Profile & goals
              </CardTitle>
              <CardDescription>
                Understand your academics, test scores, work history, and budget.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <ul className="space-y-1">
                <li>· Clarify target intake and degree (BS / MS / MBA).</li>
                <li>· Map GPA, test scores, and work profile to US expectations.</li>
                <li>· Align US plans with finances and scholarship needs.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="card-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue/10 text-[11px] font-semibold text-brand-blue">
                  2
                </span>
                Shortlist & strategy
              </CardTitle>
              <CardDescription>
                Build a balanced list of US universities with a clear story.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <ul className="space-y-1">
                <li>· Dream / target / safe university mix for your profile.</li>
                <li>· Strategy for early rounds, rolling admits, and backups.</li>
                <li>· Plan tests, essays, and recommenders around deadlines.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="card-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-red/10 text-[11px] font-semibold text-brand-red">
                  3
                </span>
                Applications & visa
              </CardTitle>
              <CardDescription>
                Execute your applications with high-quality documentation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <ul className="space-y-1">
                <li>· Essay and SoP direction that feels authentic and sharp.</li>
                <li>· Guidance on assistantships, funding, and I-20 evaluation.</li>
                <li>· Mock interviews and visa file review before your slot.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick access */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="card-surface">
          <CardHeader>
            <CardTitle className="text-sm">Explore US programs</CardTitle>
            <CardDescription>
              Filter indicative programs and send a quick enquiry for the ones
              you like.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/programs">
              <Button size="md" variant="outline" className="w-full">
                Browse programs
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="card-surface">
          <CardHeader>
            <CardTitle className="text-sm">Book a counseling slot</CardTitle>
            <CardDescription>
              Share your details and pick an evening or weekend time that works.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/counseling">
              <Button size="md" className="w-full">
                View counseling options
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="card-surface">
          <CardHeader>
            <CardTitle className="text-sm">Talk to VR Consultancy</CardTitle>
            <CardDescription>
              Prefer WhatsApp or email first? Use the contact form to outline
              your situation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/contact">
              <Button size="md" variant="outline" className="w-full">
                Contact VR Consultancy
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

interface HomeQuickLinkProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

function HomeQuickLink({ icon, title, description, href }: HomeQuickLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-xs text-slate-700 transition hover:border-brand-blue/70 hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
    >
      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50">
        {icon}
      </div>
      <div className="space-y-0.5">
        <div className="font-medium text-slate-900 dark:text-slate-50">
          {title}
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </Link>
  );
}


