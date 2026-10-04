"use client";

import { ChatCircle, PaperPlaneTilt, X } from "@phosphor-icons/react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

type AssistantCopy = {
  open: string;
  close: string;
  title: string;
  lead: string;
  placeholder: string;
  send: string;
  greeting: string;
  note: string;
  error: string;
  pending: string;
};

function messageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function Assistant({
  locale,
  copy,
}: {
  locale: "fr" | "en";
  copy: AssistantCopy;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { locale } }),
    [locale],
  );
  const { messages, sendMessage, status, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, status, open, error]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  }

  if (!open) {
    return (
      <button
        type="button"
        className="fixed right-4 bottom-5 z-40 inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(11,124,174,0.28)] hover:bg-accent-deep"
        onClick={() => setOpen(true)}
      >
        <ChatCircle size={20} weight="regular" aria-hidden />
        {copy.open}
      </button>
    );
  }

  return (
    <section
      role="dialog"
      aria-label={copy.title}
      className="fixed right-4 bottom-5 z-50 flex max-h-[min(32rem,calc(100dvh-6rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_40px_rgba(20,20,20,0.16)]"
    >
      <header className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <h2 className="text-base text-ink">{copy.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">{copy.lead}</p>
        </div>
        <button
          type="button"
          aria-label={copy.close}
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-ink hover:bg-surface"
          onClick={() => setOpen(false)}
        >
          <X size={18} weight="regular" aria-hidden />
        </button>
      </header>

      <div ref={listRef} className="flex min-h-64 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        <p className="max-w-[34ch] self-start rounded-2xl bg-surface px-3 py-2 text-sm leading-relaxed text-ink">
          {copy.greeting}
        </p>
        {messages.map((message) => {
          const text = messageText(message);
          if (!text) return null;
          const mine = message.role === "user";
          return (
            <p
              key={message.id}
              className={
                mine
                  ? "max-w-[34ch] self-end rounded-2xl bg-accent px-3 py-2 text-sm leading-relaxed text-white"
                  : "max-w-[34ch] self-start rounded-2xl bg-surface px-3 py-2 text-sm leading-relaxed text-ink"
              }
            >
              {text}
            </p>
          );
        })}
        {busy ? <p className="text-sm text-muted">{copy.pending}</p> : null}
        {error ? <p className="text-sm text-danger">{copy.error}</p> : null}
      </div>

      <form onSubmit={onSubmit} className="border-t border-line p-3">
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="assistant-question">
            {copy.placeholder}
          </label>
          <input
            ref={inputRef}
            id="assistant-question"
            value={input}
            maxLength={1000}
            placeholder={copy.placeholder}
            className="h-11 min-w-0 flex-1 rounded-[10px] border border-line bg-white px-3 text-sm text-ink outline-none placeholder:text-placeholder focus:border-accent"
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            type="submit"
            aria-label={copy.send}
            disabled={busy || input.trim().length === 0}
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-[10px] bg-accent text-white hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PaperPlaneTilt size={18} weight="regular" aria-hidden />
          </button>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">{copy.note}</p>
      </form>
    </section>
  );
}
