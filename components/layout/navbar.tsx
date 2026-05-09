import { ThemeToggle } from '../theme-toggle';

export function AppNavbar() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}