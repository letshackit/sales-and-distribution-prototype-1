import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { FunnelStage } from "../../types/dashboard"

const colors = ["#145a42", "#1a6b4e", "#238b64", "#2faa7a"]

export function FunnelCard({ data, title }: { data: FunnelStage[]; title: string }) {
  const chartData = data.map((d, i) => ({ ...d, fill: colors[i % colors.length] }))
  return (
    <div className="group rounded-2xl border-2 border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-500/50">
      <h3 className="text-sm font-bold tracking-tight text-text-muted">{title}</h3>
      <div className="mt-5 h-56 min-h-56 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={224}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} opacity={0.5} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="stage" width={110} tick={{ fontSize: 12, fontWeight: 600 }} />
            <Tooltip
              formatter={(v) => [Number(v).toLocaleString(), "Count"]}
              contentStyle={{ 
                borderRadius: 12, 
                border: "2px solid var(--color-border)", 
                fontSize: 13,
                fontWeight: 600,
                boxShadow: "var(--shadow-card-hover)",
                padding: "12px"
              }}
            />
            <Bar dataKey="count" radius={[0, 10, 10, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
