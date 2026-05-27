"use client";

import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  User,
  X,
} from "lucide-react";
import { Logo } from "../logo";

type FormState = {
  name: string;
  phone: string;
  email: string;
  description: string;
  /** Honeypot — hidden, must stay empty. */
  website: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  description: "",
  website: "",
};

export function BookIntroModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Lock scroll + escape key + autofocus first field on open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status.kind !== "submitting") onClose();
    };
    window.addEventListener("keydown", handleKey);

    const focusTimer = setTimeout(() => firstFieldRef.current?.focus(), 120);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", handleKey);
      clearTimeout(focusTimer);
    };
  }, [open, onClose, status.kind]);

  // Reset state when fully closed (after the close animation finishes)
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setForm(EMPTY);
      setStatus({ kind: "idle" });
    }, 350);
    return () => clearTimeout(t);
  }, [open]);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const description = form.description.trim();

    if (!name) return setStatus({ kind: "error", message: "Please tell us your name." });
    if (!phone) return setStatus({ kind: "error", message: "Phone number is required." });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setStatus({ kind: "error", message: "That email looks off — please double-check." });
    }
    if (description.length < 10) {
      return setStatus({
        kind: "error",
        message: "Could you share a bit more? Even a sentence or two helps.",
      });
    }

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/book-intro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          description,
          website: form.website,
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json?.ok) {
        throw new Error(
          (typeof json?.message === "string" && json.message) ||
            "Something went wrong. Please try again or email hello@mishtilabs.com.",
        );
      }

      setStatus({ kind: "success" });
      // Auto-close after a beat so users see the confirmation
      setTimeout(onClose, 3500);
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  // Backdrop click closes (only when click started outside the card)
  const onBackdropMouseDown = (e: React.MouseEvent) => {
    if (status.kind === "submitting") return;
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const submitting = status.kind === "submitting";
  const succeeded = status.kind === "success";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="book-intro-portal"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
          aria-modal
          role="dialog"
          aria-labelledby="book-intro-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={onBackdropMouseDown}
        >
          {/* Backdrop */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-[color-mix(in_oklab,var(--background)_70%,transparent)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Card */}
          <motion.div
            ref={cardRef}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            {/* Gradient border + glass surface */}
            <div
              aria-hidden
              className="absolute inset-0 -z-[1] rounded-3xl p-[1.5px]"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent) 0%, var(--highlight) 45%, var(--accent-3) 70%, var(--accent-2) 100%)",
              }}
            >
              <div className="h-full w-full rounded-[calc(1.5rem-1.5px)] bg-[var(--surface)]" />
            </div>

            {/* Inner content */}
            <div className="relative">
              {/* Decorative top glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-60"
                style={{
                  background:
                    "radial-gradient(60% 80% at 50% 100%, color-mix(in oklab, var(--accent) 35%, transparent) 0%, transparent 70%)",
                }}
              />

              {/* Header */}
              <div className="relative flex items-start justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
                <div className="flex items-center gap-3">
                  <Logo size={42} />
                  <div>
                    <h2
                      id="book-intro-title"
                      className="font-display text-xl font-semibold leading-none tracking-tight text-foreground sm:text-2xl"
                    >
                      Book an intro call
                    </h2>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      We reply within 1 working day
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  disabled={submitting}
                  onClick={onClose}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-foreground-soft transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-40"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <div className="relative px-6 pb-6 pt-5 sm:px-8 sm:pb-8">
                <AnimatePresence mode="wait">
                  {succeeded ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center gap-4 py-8 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="grid h-16 w-16 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent-2)_18%,transparent)] text-[var(--accent-2)]"
                      >
                        <CheckCircle2 className="h-8 w-8" strokeWidth={2.4} />
                      </motion.div>
                      <div>
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                          We&apos;ve got you.
                        </h3>
                        <p className="mt-2 max-w-sm text-sm text-foreground-soft">
                          A real human at MishtiLabs will reach out shortly.
                          Thanks for taking the time to write — talk soon.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={submit}
                      noValidate
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-4"
                    >
                      <p className="text-sm text-foreground-soft">
                        Tell us a little about your project, your team and your
                        timelines. We&apos;ll come back with a thoughtful first
                        response — never an autoresponder.
                      </p>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          ref={firstFieldRef}
                          icon={User}
                          label="Name"
                          required
                          name="name"
                          autoComplete="name"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(v) => update("name", v)}
                          disabled={submitting}
                        />
                        <Field
                          icon={Phone}
                          label="Phone"
                          required
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+91 99999 99999"
                          value={form.phone}
                          onChange={(v) => update("phone", v)}
                          disabled={submitting}
                        />
                      </div>

                      <Field
                        icon={Mail}
                        label="Email"
                        optional
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(v) => update("email", v)}
                        disabled={submitting}
                      />

                      <TextArea
                        icon={MessageSquare}
                        label="What can we help with"
                        required
                        name="description"
                        placeholder="A few lines about what you're building, who it's for, and when you'd like to ship."
                        value={form.description}
                        onChange={(v) => update("description", v)}
                        disabled={submitting}
                      />

                      {/* Honeypot — hidden but kept out of tab order */}
                      <input
                        type="text"
                        name="website"
                        autoComplete="off"
                        tabIndex={-1}
                        value={form.website}
                        onChange={(e) => update("website", e.target.value)}
                        className="hidden"
                        aria-hidden
                      />

                      {/* Error message */}
                      <AnimatePresence>
                        {status.kind === "error" && (
                          <motion.div
                            key="err"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-start gap-2 rounded-xl border border-[color-mix(in_oklab,var(--accent-3)_30%,var(--border))] bg-[color-mix(in_oklab,var(--accent-3)_8%,transparent)] px-3 py-2.5 text-sm text-foreground"
                          >
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-3)]" />
                            <span>{status.message}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="mt-2 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[11px] text-muted sm:max-w-[14rem]">
                          By sending, you agree we&apos;ll reply by phone or email
                          — we&apos;ll never share your details.
                        </p>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send request <ArrowUpRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------- */
/* Field primitives                                                     */
/* -------------------------------------------------------------------- */

type FieldBase = {
  label: string;
  name: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  icon: React.ComponentType<{ className?: string }>;
};

type FieldProps = FieldBase & {
  type?: string;
  autoComplete?: string;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  {
    icon: Icon,
    label,
    name,
    type = "text",
    required,
    optional,
    placeholder,
    value,
    onChange,
    disabled,
    autoComplete,
  },
  ref,
) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} optional={optional} />
      <div className="relative mt-2">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          ref={ref}
          type={type}
          name={name}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 pl-10 text-sm text-foreground transition placeholder:text-muted focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklab,var(--accent)_35%,transparent)] disabled:opacity-60"
        />
      </div>
    </label>
  );
});

function TextArea({
  icon: Icon,
  label,
  name,
  required,
  optional,
  placeholder,
  value,
  onChange,
  disabled,
}: FieldBase) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} optional={optional} />
      <div className="relative mt-2">
        <Icon className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted" />
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={4}
          className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 pl-10 text-sm leading-relaxed text-foreground transition placeholder:text-muted focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklab,var(--accent)_35%,transparent)] disabled:opacity-60"
        />
      </div>
    </label>
  );
}

function FieldLabel({
  label,
  required,
  optional,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <span className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
      <span>
        {label}
        {required && <span className="ml-1 text-[var(--accent-2)]">*</span>}
      </span>
      {optional && (
        <span className="text-[9px] tracking-[0.2em] text-muted/70 normal-case">
          optional
        </span>
      )}
    </span>
  );
}
