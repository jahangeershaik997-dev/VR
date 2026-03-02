import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contact · VR Consultancy"
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Speak with a VR USA expert
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          Share a few details about yourself and a dedicated US counseling
          specialist will reach out with a tailored next step.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact form</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}

