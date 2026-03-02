import { AdminLeadsClient } from "@/components/admin-leads-client";

export const metadata = {
  title: "Leads · VR Consultancy Admin"
};

export default function AdminLeadsPage() {
  const adminKeyConfigured = !!process.env.ADMIN_KEY;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
        Leads
      </h1>
      <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
        Lightweight, local-only view of captured leads. In production you should
        back this with a proper database (Supabase / Postgres) and server-side
        reporting.
      </p>
      <AdminLeadsClient adminKeyConfigured={adminKeyConfigured} />
    </div>
  );
}

