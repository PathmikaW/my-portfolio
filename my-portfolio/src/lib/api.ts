export const api = {
  get: async (url: string) => {
    const res = await fetch(url);
    return await res.json();
  },
  post: async (url: string, data: unknown) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  },
};
