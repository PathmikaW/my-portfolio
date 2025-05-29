import Navigation from "@/components/Navigation";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Hi, I’m Pathmika 👋
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            I’m a software engineer who builds modern, performant, and thoughtful digital experiences.
            Welcome to my portfolio!
          </p>
        </div>
      </main>

      <footer className="py-6 text-sm text-center text-muted-foreground border-t">
        © {new Date().getFullYear()} Pathmika.me — All rights reserved.
      </footer>
    </div>
  );
}
