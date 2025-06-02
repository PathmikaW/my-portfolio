'use client';

export function Footer() {
  return (
    <footer className="flex items-center justify-center p-6 border-t text-sm">
      &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
    </footer>
  );
}
