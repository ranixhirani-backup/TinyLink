'use client';

import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            TL
          </div>
          <span className="text-xl font-bold">TinyLink</span>
        </Link>
        <div className="flex gap-6">
          <Link
            href="/"
            className="hover:text-blue-400 transition-colors"
          >
            Dashboard
          </Link>
          <a
            href="/api/healthz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            Health
          </a>
        </div>
      </div>
    </nav>
  );
}
