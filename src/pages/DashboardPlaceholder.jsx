import { Container } from '@/components/layout/Container'

export function DashboardPlaceholder({ title = 'This section', subtitle = 'Coming soon.' }) {
  return (
    <Container>
      <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] p-8 text-center">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h2>
        <p className="mt-2 text-[var(--text-muted)]">{subtitle}</p>
      </div>
    </Container>
  )
}
