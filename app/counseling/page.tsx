import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CounselingBooking } from "@/components/counseling-booking";

export const metadata = {
  title: "Counseling · VR Consultancy"
};

export default function CounselingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          1:1 US counseling session
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          Book a focused call with a senior VR counselor to understand your
          profile fit, funding options, and timelines for the US.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Select a time and share details</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <p className="text-sm text-slate-400">Loading counseling form…</p>
            }
          >
            <CounselingBooking />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

