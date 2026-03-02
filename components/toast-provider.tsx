"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  React.useEffect(() => {
    function onEvent(e: Event) {
      const custom = e as CustomEvent<
        Omit<Toast, "id">
      >;
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { ...custom.detail, id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4500);
    }

    window.addEventListener("vr-toast", onEvent as EventListener);
    return () => {
      window.removeEventListener("vr-toast", onEvent as EventListener);
    };
  }, []);

  const showToast = React.useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4500);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-4 z-50 flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto rounded-2xl border px-4 py-3 shadow-soft backdrop-blur",
              toast.variant === "success" &&
                "border-emerald-200/70 bg-emerald-50/90 text-emerald-900 dark:border-emerald-500/40 dark:bg-slate-900/95 dark:text-emerald-50",
              toast.variant === "error" &&
                "border-rose-200/70 bg-rose-50/90 text-rose-900 dark:border-rose-500/40 dark:bg-slate-900/95 dark:text-rose-50"
            )}
          >
            <div className="text-sm font-medium">{toast.title}</div>
            {toast.description ? (
              <div className="mt-1 text-xs opacity-90">
                {toast.description}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

