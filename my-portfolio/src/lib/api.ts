// src/lib/api.ts

export async function getProfile() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/profile`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }

  return res.json();
}

export async function getAchievements() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/achievements`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch achievements');
  }

  return res.json();
}

export async function getContactInfo() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/contact`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch contact info');
  }

  return res.json();
}

export async function getEducation() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/education`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch education');
  }

  return res.json();
}
