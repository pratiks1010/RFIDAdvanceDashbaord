import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { DashboardCard } from '../DashboardCard'

/**
 * Bar chart card – vertical bars. data: [{ name, ...values }], bars: [{ dataKey, name, fill }].
 * Stacked: pass stacked in bars or use one bar per dataKey.
 */
export function BarChartCard({
  title,
  subtitle,
  data = [],
  bars = [],
  stacked = false,
  onViewReport,
  className = '',
  chartHeight = 280,
}) {
  return (
    <DashboardCard title={title} subtitle={subtitle} onViewReport={onViewReport} className={className}>
      <div className="dash-chart-wrap">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <RechartsBarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} stroke="var(--border-default)" />
            <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} stroke="var(--border-default)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
              }}
              labelStyle={{ color: 'var(--text-primary)' }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {bars.map((b) => (
              <Bar
                key={b.dataKey}
                dataKey={b.dataKey}
                name={b.name ?? b.dataKey}
                fill={b.fill ?? 'var(--color-primary)'}
                stackId={stacked ? 'stack' : undefined}
                radius={[2, 2, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  )
}
