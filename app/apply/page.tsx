import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApplyFlow } from "@/components/apply-flow";

export const metadata = {
  title: "Apply · VR Consultancy"
};

export default function ApplyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Begin your US application with VR
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          Share your core profile details and a VR counselor will build a
          university shortlist and next-step plan for you.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Application overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <p className="text-sm text-slate-400">Loading application flow…</p>
            }
          >
            <ApplyFlow />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

