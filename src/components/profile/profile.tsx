import { signOut } from "@/app/profile/actions";

const actionButtonClassName =
  "shrink-0 cursor-pointer rounded border px-2 py-0.5 text-[10px] font-medium tracking-wide transition-colors sm:text-[11px]";

const valueShellClassName =
  "min-w-0 w-full rounded-md border border-black/50 bg-[#060910] px-2.5 py-2 font-mono text-xs text-zinc-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] sm:px-3 sm:text-[13px]";

const labelClassName =
  "text-[10px] font-medium uppercase tracking-widest text-zinc-500 sm:w-24 sm:shrink-0 sm:text-[11px]";

type ProfileProps = {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
    createdAt?: Date | string | null;
  };
};

function getInitials(name?: string | null) {
  if (!name?.trim()) {
    return "?";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatMemberSince(value?: Date | string | null) {
  if (!value) {
    return "—";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

export function Profile({ user }: ProfileProps) {
  const displayName = user.name?.trim() || "—";
  const initials = getInitials(user.name);

  return (
    <fieldset className="m-0 w-full min-w-0 rounded-lg border border-slate-600/50 bg-linear-to-b from-[#0f1419] to-[#0a0e14] p-0 font-mono text-sm shadow-[inset_0_1px_0_rgba(148,163,184,0.06)]">
      <legend className="ml-2 px-1.5 text-[10px] font-medium uppercase tracking-widest text-sky-400 sm:ml-3 sm:text-[11px]">
        Profile
      </legend>

      <div className="space-y-4 px-3 pb-3 pt-1 sm:px-4">
        <div className="flex flex-col items-center gap-3 border-b border-zinc-800/70 pb-4 sm:flex-row sm:items-center sm:gap-4">
          <div
            className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-700/80 bg-[#060910] text-sm font-medium text-zinc-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] sm:size-14"
            aria-hidden={Boolean(user.image)}
          >
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div className="min-w-0 text-center sm:text-left">
            <p className="truncate text-base font-medium text-zinc-100 sm:text-[15px]">
              {displayName}
            </p>
            <p className="truncate text-[11px] text-zinc-500 sm:text-[12px]">
              {user.email}
            </p>
          </div>
        </div>

        <dl className="space-y-3">
          <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <dt className={labelClassName}>Name</dt>
            <dd className={valueShellClassName}>{displayName}</dd>
          </div>

          <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <dt className={labelClassName}>Email</dt>
            <dd className={`${valueShellClassName} break-all`}>{user.email}</dd>
          </div>

          <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <dt className={labelClassName}>Member since</dt>
            <dd className={valueShellClassName}>
              {formatMemberSince(user.createdAt)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex justify-end border-t border-zinc-800/90 px-3 py-2.5 sm:px-4">
        <form action={signOut}>
          <button
            type="submit"
            className={`${actionButtonClassName} border-red-500/70 bg-red-950/80 text-red-400 shadow-[0_0_12px_rgba(248,113,113,0.12)] hover:bg-red-900/80`}
          >
            Log out
          </button>
        </form>
      </div>
    </fieldset>
  );
}
