// src/lib/api.ts

export async function getProfile() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/profile`, {
    next: { revalidate: 60 }, // Next.js cache, optional
  });

  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }

  return res.json();
}
