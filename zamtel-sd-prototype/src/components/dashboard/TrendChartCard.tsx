import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function TrendChartCard({
  title,
  data,
  lines,
}: {
  title: string
  data: Record<string, string | number>[]
  lines: { key: string; name: string; color: string }[]
}) {
  return (
    <div className="group rounded-2xl border-2 border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-500/50">
      <h3 className="text-sm font-bold tracking-tight text-text-muted">{title}</h3>
      <div className="mt-5 h-56 min-h-56 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={224}>
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 500 }} interval={6} stroke="var(--color-text-muted)" />
            <YAxis tick={{ fontSize: 11, fontWeight: 500 }} width={36} stroke="var(--color-text-muted)" />
            <Tooltip 
              contentStyle={{ 
                borderRadius: 12, 
                fontSize: 13,
                fontWeight: 600,
                border: "2px solid var(--color-border)",
                boxShadow: "var(--shadow-card-hover)",
                padding: "12px"
              }} 
            />
            <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
            {lines.map((l) => (
              <Line
                key={l.key}
                type="monotone"
                dataKey={l.key}
                name={l.name}
                stroke={l.color}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
