"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpWithEmail } from "./actions";

const inputClassName =
  "block w-full rounded-md bg-white/5 px-3 py-2 text-foreground placeholder:text-zinc-500 outline-1 outline-white/10 focus:outline-zinc-400";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-foreground underline underline-offset-4 hover:text-zinc-300"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-zinc-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jane Doe"
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-zinc-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className={inputClassName}
            />
          </div>

          {state?.error ? (
            <div className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {state.error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
