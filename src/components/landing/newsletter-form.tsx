"use client";

import { useId, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";

async function subscribe(email: string) {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) {
    throw new Error(data.error ?? "Something went wrong. Please try again.");
  }
}

export function NewsletterForm() {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const mutation = useMutation({ mutationFn: subscribe });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(email.trim(), { onSuccess: () => setEmail("") });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-[349px]">
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className="flex h-[50px]">
        <Input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="Lorem ipsum"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (mutation.isError) mutation.reset();
          }}
          aria-invalid={mutation.isError || undefined}
          aria-describedby={messageId}
          className="h-full flex-1 text-xs"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-[124px] shrink-0 bg-[#ff5409] text-[10.5px] font-medium tracking-[1.68px] text-white uppercase transition-colors hover:bg-[#ff6a2b] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:opacity-60"
        >
          {mutation.isPending ? "…" : "Demo"}
        </button>
      </div>
      <p id={messageId} aria-live="polite" className="mt-2 min-h-5 text-xs">
        {mutation.isError && (
          <span className="text-destructive">{mutation.error.message}</span>
        )}
        {mutation.isSuccess && (
          <span className="text-white/70">
            Thanks, you&apos;re on the list.
          </span>
        )}
      </p>
    </form>
  );
}
