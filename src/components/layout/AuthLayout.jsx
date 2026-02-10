import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] flex flex-col">
      <header className="flex justify-end p-4 sm:p-6">
        <ThemeToggle />
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-[26rem]">
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-lg)] sm:p-8">
            <h1 className="text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {subtitle}
              </p>
            )}
            <div className="mt-6">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
