"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({
  open: openProp,
  defaultOpen,
  onOpenChange,
  children
}: DialogProps) {
  const [uncontrolled, setUncontrolled] = React.useState(!!defaultOpen);
  const open = openProp ?? uncontrolled;

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setUncontrolled(next);
    onOpenChange?.(next);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  children
}: {
  children: React.ReactElement;
}) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) return children;
  return React.cloneElement(children, {
    onClick: () => ctx.setOpen(true)
  });
}

export function DialogContent({
  className,
  children
}: React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(DialogContext);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!ctx || !ctx.open || !mounted) return null;

  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur">
      <div
        className={cn(
          "card-surface relative w-full max-w-lg border border-slate-200/60 px-6 py-5 dark:border-slate-800",
          className
        )}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-3 flex flex-col gap-1", className)}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-display text-lg font-semibold text-slate-900 dark:text-slate-50",
        className
      )}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
      {...props}
    />
  );
}

