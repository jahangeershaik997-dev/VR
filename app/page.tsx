import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Globe2,
  GraduationCap,
  Plane,
  Newspaper
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

export const metadata = {
  title: "VR Consultancy · Study in USA"
};

const DESTINATIONS = [
  {
    country: "Singapore",
    code: "SG",
    visas: ["Work Visa", "Student Visa", "Visit Visa", "Business Visa"]
  },
  {
    country: "Australia",
    code: "AU",
    visas: ["PR Visa", "Work Visa", "Student Visa", "Visit Visa", "Business Visa"]
  },
  {
    country: "Canada",
    code: "CA",
    visas: ["PR Visa", "Work Visa", "Student Visa", "Visit Visa", "Business Visa"]
  },
  {
    country: "United Kingdom",
    code: "UK",
    visas: ["Skilled Worker", "Student Visa", "Visit Visa", "Business Visa"]
  },
  {
    country: "United Arab Emirates",
    code: "UAE",
    visas: ["Work Visa", "Student Visa", "Visit Visa", "Business Visa"]
  },
  {
    country: "Germany",
    code: "DE",
    visas: ["Opportunity Card", "Work Visa", "Student Visa", "Visit Visa"]
  }
];

const TRUST_STATS = [
  { label: "Successful applicants", value: "500+" },
  { label: "Clients counselled", value: "1,000+" },
  { label: "Since", value: "2018" },
  { label: "Offices", value: "2+" }
];

const SERVICE_CLUSTERS = [
  {
    id: "migrate",
    label: "Migrate",
    icon: Globe2,
    description:
      "Long-term pathways for professionals and families looking at the US and beyond.",
    links: ["USA PR-adjacent via study & work", "Canada & Australia referrals"]
  },
  {
    id: "work",
    label: "Work",
    icon: Briefcase,
    description:
      "Career-first support for working professionals targeting US roles or onshore upskilling.",
    links: ["Role targeting & profile review", "Roadmap to US work opportunities"]
  },
  {
    id: "study",
    label: "Study",
    icon: GraduationCap,
    description:
      "End-to-end US admissions help from profile evaluation to visas.",
    links: ["BS / MS / MBA shortlisting", "Essay, SoP & recommendations", "Visa preparation"]
  },
  {
    id: "coaching",
    label: "Coaching",
    icon: Plane,
    description:
      "Guidance around tests, timelines, and documentation for a smooth US journey.",
    links: ["Timeline planning", "Document checklists", "Interview guidance"]
  }
];

const BLOG_TABS = [
  {
    id: "blog",
    label: "Blog",
    items: [
      {
        title: "US admissions timelines explained",
        date: "Mar 2026",
        excerpt:
          "Understand how US intakes work and how early you should start your planning."
      },
      {
        title: "Funding options for US master’s students",
        date: "Feb 2026",
        excerpt:
          "Assistantships, scholarships, and realistic budgets for Indian applicants."
      },
      {
        title: "Shortlisting US universities without guesswork",
        date: "Jan 2026",
        excerpt:
          "How VR Consultancy structures dream, target, and safe university lists."
      }
    ]
  },
  {
    id: "news",
    label: "News",
    items: [
      {
        title: "Recent updates to US student visa guidance",
        date: "Mar 2026",
        excerpt:
          "Key changes applicants should be aware of before planning their interview."
      },
      {
        title: "STEM OPT trends for international graduates",
        date: "Jan 2026",
        excerpt:
          "What recent cohorts have experienced with internships and early roles."
      },
      {
        title: "US universities expanding need-based aid",
        date: "Dec 2025",
        excerpt:
          "A look at new funding initiatives relevant for Indian students."
      }
    ]
  },
  {
    id: "jobs",
    label: "Jobs Blog",
    items: [
      {
        title: "Top skills US tech employers value in 2026",
        date: "Mar 2026",
        excerpt:
          "Beyond CGPA: how projects, internships, and communication show up in admits."
      },
      {
        title: "Building a profile while you wait for admits",
        date: "Feb 2026",
        excerpt:
          "Practical steps to keep your profile active during the application cycle."
      },
      {
        title: "Using US study to pivot careers",
        date: "Jan 2026",
        excerpt:
          "Stories of applicants who used US programs to switch domains."
      }
    ]
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero with four CTAs */}
      <section className="relative hero-gradient space-y-8 rounded-3xl shadow-soft">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
              Study in the United States
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 md:text-4xl">
              What can we do for you today?
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
              Quick actions
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <HeroQuickCTA
                icon={<GraduationCap className="h-5 w-5 text-brand-red" />}
                title="Study"
                description="Explore US study plans across BS, MS, and MBA."
                href="/study-in-usa"
              />
              <HeroQuickCTA
                icon={<Globe2 className="h-5 w-5 text-brand-blue" />}
                title="Migrate"
                description="Understand how US study supports long-term plans."
                href="/migrate"
              />
              <HeroQuickCTA
                icon={<Briefcase className="h-5 w-5 text-brand-red" />}
                title="Work"
                description="Plan your career path around US education."
                href="/work"
              />
              <HeroQuickCTA
                icon={<Plane className="h-5 w-5 text-brand-blue" />}
                title="Visit"
                description="Get clarity on visit and dependent visa options."
                href="/visa"
              />
            </div>
          </div>
        </div>
        <div className="pointer-events-auto absolute bottom-4 right-4 hidden max-w-xs rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-xs text-slate-700 shadow-soft md:block dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-200">
          <p className="text-[11px] font-semibold text-brand-blue">
            Don&apos;t know what to do?
          </p>
          <p className="mt-1 text-[11px]">
            Get a free 15-minute counseling conversation to understand where you
            stand and what&apos;s realistic.
          </p>
          <div className="mt-2">
            <Link href="/counseling">
              <Button size="sm" className="w-full">
                Get free counseling
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Popular destinations
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Explore key countries our US-focused applicants also consider for
              alternate pathways and back-up options.
            </p>
          </div>
        </div>
        <div className="-mx-4 overflow-x-auto pb-2">
          <div className="flex gap-4 px-4">
            {DESTINATIONS.map((dest) => (
              <Card
                key={dest.country}
                className="min-w-[220px] max-w-[260px] flex-1 cursor-pointer rounded-2xl border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900/90"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{dest.country}</CardTitle>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                      {dest.code}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {dest.visas.map((visa) => (
                    <div
                      key={visa}
                      className="flex items-center justify-between gap-2 py-0.5"
                    >
                      <span>{visa}</span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + Why choose us */}
      <section className="space-y-8">
        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white/80 px-4 py-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80 sm:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="font-display text-lg font-semibold text-brand-blue">
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-3">
            <h2 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Why choose VR Consultancy?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              We focus on US admissions only—so every conversation, recommendation,
              and checklist is optimized for American universities and their timelines.
            </p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>· Profile-first planning with a clear view of feasibility.</li>
              <li>· Transparent conversations on budgets, funding, and outcomes.</li>
              <li>· Structured documentation support instead of generic templates.</li>
              <li>· Visa preparation that ties back to your academic and career story.</li>
            </ul>
          </div>
          <div className="card-surface relative overflow-hidden border border-slate-200 px-6 py-6 text-sm text-slate-600 shadow-soft dark:border-slate-800 dark:text-slate-200">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-red/20 to-brand-blue/20" />
            <p className="relative">
              VR Consultancy acts as your US admissions operations team—tracking
              deadlines, documentation, and conversations so that you can focus on
              academics, projects, and work.
            </p>
          </div>
        </div>
      </section>

      {/* Services (Migrate / Work / Study / Coaching) */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Services tailored to your US plan
        </h2>
        <Tabs defaultValue="study" className="space-y-4">
          <TabsList>
            {SERVICE_CLUSTERS.map((cluster) => (
              <TabsTrigger key={cluster.id} value={cluster.id}>
                {cluster.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {SERVICE_CLUSTERS.map((cluster) => (
            <TabsContent key={cluster.id} value={cluster.id}>
              <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
                <div className="space-y-3 rounded-2xl border border-slate-200 bg-white/90 p-5 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                      <cluster.icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                      {cluster.label} with VR Consultancy
                    </h3>
                  </div>
                  <p>{cluster.description}</p>
                  <ul className="space-y-1 text-xs">
                    {cluster.links.map((link) => (
                      <li key={link} className="flex items-center gap-1">
                        <ArrowRight className="h-3 w-3 text-brand-blue" />
                        <span>{link}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Card className="card-surface h-full rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-blue/5 to-brand-red/5 text-sm text-slate-700 shadow-soft dark:border-slate-800 dark:text-slate-200">
                  <CardHeader>
                    <CardTitle className="text-sm">
                      Talk through this service with an expert
                    </CardTitle>
                    <CardDescription>
                      Share where you are in your journey and we&apos;ll map exactly
                      how this service fits.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/counseling">
                      <Button size="md" className="w-full">
                        Book a free counseling call
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Latest news / blog */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Insights &amp; updates
          </h2>
        </div>
        <Tabs defaultValue="blog" className="space-y-4">
          <TabsList>
            {BLOG_TABS.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {BLOG_TABS.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <div className="grid gap-4 md:grid-cols-3">
                {tab.items.map((item) => (
                  <Card
                    key={item.title}
                    className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white/95 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900/95"
                  >
                    <CardHeader className="pb-3">
                      <div className="mb-1 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <Newspaper className="h-3 w-3" />
                        <span>{item.date}</span>
                      </div>
                      <CardTitle className="text-sm leading-snug">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-between text-xs text-slate-600 dark:text-slate-300">
                      <p className="mb-3 line-clamp-3">{item.excerpt}</p>
                      <Link
                        href="/resources"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-blue"
                      >
                        Read more
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}

interface HeroQuickCTAProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

function HeroQuickCTA({
  icon,
  title,
  description,
  href
}: HeroQuickCTAProps) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-xs text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-brand-blue hover:shadow-soft dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200"
    >
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50">
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

