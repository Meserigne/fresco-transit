"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { company } from "@/lib/site";

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

const fieldClass =
  "h-12 w-full rounded-[8px] border border-line bg-white px-3 text-base text-ink placeholder:text-placeholder";

export function ContactForm({
  copy,
  initialMessage = "",
}: {
  copy: Dictionary["contactForm"];
  initialMessage?: string;
}) {
  const [fields, setFields] = useState<Fields>({
    ...empty,
    message: initialMessage,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus("idle");
  }

  function validate(values: Fields): Errors {
    const next: Errors = {};
    if (values.name.trim().length < 2) {
      next.name = copy.nameError;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = copy.emailError;
    }
    if (values.message.trim().length < 10) {
      next.message = copy.messageError;
    }
    return next;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(fields);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("idle");
      return;
    }

    const subject = `${copy.subject} ${fields.name.trim()} ${copy.subjectFor}`;
    const body = [
      `Nom: ${fields.name.trim()}`,
      `Société: ${fields.company.trim() || "-"}`,
      `E-mail: ${fields.email.trim()}`,
      `Téléphone: ${fields.phone.trim() || "-"}`,
      "",
      fields.message.trim(),
    ].join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("ready");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="nom"
          label={copy.name}
          value={fields.name}
          error={errors.name}
          autoComplete="name"
          onChange={(value) => update("name", value)}
        />
        <Field
          id="societe"
          label={copy.company}
          optionalLabel={copy.optional}
          optional
          value={fields.company}
          autoComplete="organization"
          onChange={(value) => update("company", value)}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="email"
          label={copy.email}
          type="email"
          value={fields.email}
          error={errors.email}
          autoComplete="email"
          helper={copy.emailHelp}
          onChange={(value) => update("email", value)}
        />
        <Field
          id="telephone"
          label={copy.phone}
          type="tel"
          optionalLabel={copy.optional}
          optional
          value={fields.phone}
          autoComplete="tel"
          onChange={(value) => update("phone", value)}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-semibold text-ink">
          {copy.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder={copy.placeholder}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full rounded-[8px] border border-line bg-white px-3 py-3 text-base leading-relaxed text-ink placeholder:text-placeholder"
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex h-12 cursor-pointer items-center justify-center rounded-[8px] bg-accent px-5 text-sm font-semibold whitespace-nowrap text-white transition-[color,background-color,transform] duration-200 hover:bg-accent-deep active:scale-[0.98]"
        >
          {copy.submit}
        </button>
        {status === "ready" ? (
          <p role="status" className="text-sm text-muted">
            {copy.ready} {company.email}.
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  helper,
  optional,
  optionalLabel,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helper?: string;
  optional?: boolean;
  optionalLabel?: string;
  type?: string;
  autoComplete?: string;
}) {
  const describedBy = [helper ? `${id}-help` : "", error ? `${id}-error` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {optional ? <span className="font-normal text-muted"> ({optionalLabel})</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={!optional}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={fieldClass}
      />
      {helper ? (
        <p id={`${id}-help`} className="text-sm text-muted">
          {helper}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
