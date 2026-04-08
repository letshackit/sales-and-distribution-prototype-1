import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { AppShell } from "../components/layout/AppShell"
import { PageHeader } from "../components/layout/PageHeader"
import { StickyFilterBar } from "../components/layout/StickyFilterBar"
import { w10Stages } from "../data/webScreensSeed"

const colors = ["#0d3b2c", "#145a42", "#1a6b4e", "#238b64", "#2faa7a", "#64748b"]

export function RecruitmentPipeline() {
  return (
    <AppShell>
      <PageHeader title="Recruitment pipeline" />
      <StickyFilterBar />
      <div className="px-6 py-6">
        <div className="flex h-80 flex-col rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
          <h3 className="shrink-0 text-xs font-semibold uppercase text-text-muted">Onboarding stages</h3>
          <div className="mt-2 min-h-0 w-full min-w-0 flex-1">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
              <BarChart data={w10Stages} margin={{ top: 8, right: 8, left: 8, bottom: 40 }}>
                <XAxis dataKey="stage" tick={{ fontSize: 10 }} interval={0} angle={-18} textAnchor="end" />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {w10Stages.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
