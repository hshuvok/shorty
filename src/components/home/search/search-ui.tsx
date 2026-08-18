"use client";

import { useMemo, useState } from "react";
import {
  formatShortenLabel,
  normalizeUrlInput,
  sanitizeCustomSlug,
} from "@/components/home/search/auto-url-generator";

const actionButtonClassName =
  "shrink-0 cursor-pointer rounded border px-2 py-0.5 text-[10px] font-medium tracking-wide transition-colors sm:text-[11px]";

const inputShellClassName =
  "min-w-0 flex-1 rounded-md border border-black/50 bg-[#060910] px-2.5 py-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] sm:px-3";

const inputClassName =
  "min-w-0 flex-1 bg-transparent font-mono text-zinc-100 outline-none placeholder:text-zinc-600";

type UrlMode = "auto" | "custom";

export function SearchUI() {
  const [mode, setMode] = useState<UrlMode>("auto");
  const [url, setUrl] = useState("type your url here...");
  const [customUrlDraft, setCustomUrlDraft] = useState("");
  const [appliedCustomUrl, setAppliedCustomUrl] = useState("");

  const shortenLabel = useMemo(
    () =>
      formatShortenLabel(
        url,
        mode === "custom" ? appliedCustomUrl || customUrlDraft : undefined,
      ),
    [appliedCustomUrl, customUrlDraft, mode, url],
  );

  const handleApplyCustomUrl = () => {
    setAppliedCustomUrl(sanitizeCustomSlug(customUrlDraft));
  };

  const handleDeleteCustomUrl = () => {
    setCustomUrlDraft("");
    setAppliedCustomUrl("");
    setMode("auto");
  };

  return (
    <fieldset className="m-0 w-full min-w-0 rounded-lg border border-slate-600/50 bg-linear-to-b from-[#0f1419] to-[#0a0e14] p-0 font-mono text-sm shadow-[inset_0_1px_0_rgba(148,163,184,0.06)]">
      <legend className="ml-2 px-1.5 text-[10px] font-medium uppercase tracking-widest text-sky-400 sm:ml-3 sm:text-[11px]">
        Input URL
      </legend>

      <div className="space-y-2 px-3 pb-3 pt-1 sm:px-4">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div
            className="flex shrink-0 items-center gap-1 sm:gap-1.5"
            aria-hidden="true"
          >
            <span className="size-2 rounded-full bg-zinc-600 sm:size-2.5" />
            <span className="size-2 rounded-full bg-zinc-600 sm:size-2.5" />
            <span className="size-2 rounded-full bg-zinc-600 sm:size-2.5" />
          </div>

          <div className={inputShellClassName}>
            <div className="flex min-w-0 items-center text-xs sm:text-[13px]">
              <span className="shrink-0 text-zinc-500">https://</span>
              <input
                type="text"
                value={url}
                onChange={(event) => setUrl(normalizeUrlInput(event.target.value))}
                spellCheck={false}
                aria-label="Short link URL"
                className={`${inputClassName} text-xs sm:text-[13px]`}
              />
            </div>
          </div>
        </div>

        {mode === "custom" ? (
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <div className={inputShellClassName}>
              <input
                type="text"
                value={customUrlDraft}
                onChange={(event) => setCustomUrlDraft(event.target.value)}
                placeholder="Add your custom URL"
                spellCheck={false}
                aria-label="Custom short URL"
                className={`${inputClassName} w-full text-xs sm:text-[13px]`}
              />
            </div>

            <div className="flex shrink-0 items-center justify-end gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleApplyCustomUrl}
                className={`${actionButtonClassName} border-green-500/70 bg-green-950/80 text-green-400 shadow-[0_0_12px_rgba(74,222,128,0.12)] hover:bg-green-900/80`}
              >
                Add
              </button>
              <button
                type="button"
                onClick={handleDeleteCustomUrl}
                className={`${actionButtonClassName} border-red-500/70 bg-red-950/80 text-red-400 shadow-[0_0_12px_rgba(248,113,113,0.12)] hover:bg-red-900/80`}
              >
                Delete
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col items-start gap-2 border-t border-zinc-800/90 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-x-3 sm:gap-y-1.5 sm:px-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("auto")}
            className={`${actionButtonClassName} ${
              mode === "auto"
                ? "border-green-500/70 bg-green-900/90 text-green-300 shadow-[0_0_12px_rgba(74,222,128,0.12)]"
                : "border-green-500/40 bg-green-950/40 text-green-500/80 hover:bg-green-950/70"
            }`}
          >
            Add URL
          </button>
          <button
            type="button"
            onClick={() => setMode("custom")}
            className={`${actionButtonClassName} ${
              mode === "custom"
                ? "border-purple-500/70 bg-purple-900/90 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.12)]"
                : "border-purple-500/40 bg-purple-950/40 text-purple-500/80 hover:bg-purple-950/70"
            }`}
          >
            Custom URL
          </button>
        </div>

        <p className="min-w-0 text-[11px] leading-snug text-zinc-500 sm:text-[12px]">
          <span className="text-zinc-400">Shorten:</span>{" "}
          <span className="text-zinc-200">
            {shortenLabel.replace(/^Shorten:\s*/, "")}
          </span>
        </p>
      </div>
    </fieldset>
  );
}
