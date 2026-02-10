import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts'
import { DashboardCard } from '../DashboardCard'

const DEFAULT_COLORS = [
  'var(--color-primary)',
  'var(--color-success)',
  'var(--color-error)',
  'var(--color-warning)',
]

/**
 * Doughnut chart card – data: [{ name, value }, ...], colors optional.
 */
export function DoughnutChartCard({
  title,
  subtitle,
  data = [],
  colors = DEFAULT_COLORS,
  onViewReport,
  className = '',
  chartHeight = 260,
}) {
  return (
    <DashboardCard title={title} subtitle={subtitle} onViewReport={onViewReport} className={className}>
      <div className="dash-chart-wrap" style={{ minHeight: chartHeight }}>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} stroke="var(--bg-card)" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  )
}
