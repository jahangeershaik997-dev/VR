import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgramEnquireModal } from "@/components/program-enquire-modal";
import { programs } from "@/data/programs";

export const metadata = {
  title: "Programs · VR Consultancy"
};

export default function ProgramsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Featured programs for ambitious profiles
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          A curated snapshot of popular US programs our counselors frequently
          place students into. Use the enquiry button to share your profile.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {programs.map((program) => (
          <Card key={program.slug}>
            <CardHeader>
              <CardTitle>{program.name}</CardTitle>
              <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Badge variant="outline">{program.level}</Badge>
                <Badge variant="outline">{program.discipline}</Badge>
                <span>
                  {program.city}, {program.state}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Indicative listing only. Your counselor will shortlist final
                universities based on your academic profile, finances, and
                priorities.
              </p>
              <Suspense
                fallback={
                  <div className="mt-3 h-9 w-40 rounded-full bg-slate-100 dark:bg-slate-800" />
                }
              >
                <ProgramEnquireModal
                  programSlug={program.slug}
                  programName={program.name}
                />
              </Suspense>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

