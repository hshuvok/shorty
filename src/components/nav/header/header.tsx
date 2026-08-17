"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/stats", label: "Stats" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

type HeaderProps = {
  user?: {
    name?: string;
    imageUrl?: string;
  } | null;
};

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-zinc-100 text-foreground dark:bg-zinc-800"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-foreground dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

export function Header({ user = null }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 dark:border-zinc-800">
      <div className="mx-auto grid h-14 max-w-7xl grid-cols-2 items-center gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="justify-self-start">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            shorty
          </Link>
        </div>

        <nav
          className="hidden justify-self-center md:block"
          aria-label="Main navigation"
        >
          <ul className="flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href} label={label} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-start-2 flex items-center justify-end gap-2 justify-self-end md:col-start-3">
          {user ? (
            <Link
              href="/profile"
              aria-label={user.name ? `Profile for ${user.name}` : "Profile"}
              className="flex size-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-100 hover:text-foreground dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-foreground"
            >
              {user.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.imageUrl}
                  alt=""
                  className="size-full rounded-full object-cover"
                />
              ) : (
                <ProfileIcon className="size-5" />
              )}
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
            >
              Log in
            </Link>
          )}

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-foreground md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-foreground"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full z-50 border-t border-zinc-200 bg-background/95 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/80 md:hidden dark:border-zinc-800"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <NavLink
                  href={href}
                  label={label}
                  onClick={closeMobileMenu}
                />
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
