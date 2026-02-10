import { Container } from '@/components/layout/Container';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function PageLayout({ children, title }) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <header className="sticky top-0 z-10 border-b border-[var(--border-default)] bg-[var(--bg-card)] shadow-sm">
        <Container className="flex h-14 sm:h-16 items-center justify-between gap-4">
          <h1 className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
            {title ?? 'RfidDashboard'}
          </h1>
          <ThemeToggle />
        </Container>
      </header>
      <main className="py-4 sm:py-6 lg:py-8">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
