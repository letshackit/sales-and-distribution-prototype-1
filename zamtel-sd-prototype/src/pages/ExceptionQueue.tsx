import { useState } from "react"
import { Modal } from "../components/common/Modal"
import { AppShell } from "../components/layout/AppShell"
import { PageHeader } from "../components/layout/PageHeader"
import { StickyFilterBar } from "../components/layout/StickyFilterBar"
import { useDemo } from "../context/DemoContext"
import { w06Queues } from "../data/webScreensSeed"
import clsx from "clsx"

export function WebExceptionQueue() {
  const { role } = useDemo()
  const canApprove = ["TL", "TDR", "ZBM", "Admin"].includes(role)
  const [modal, setModal] = useState<{ title: string } | null>(null)

  return (
    <AppShell>
      <PageHeader title="Exception queue &amp; approvals" />
      <StickyFilterBar />
      <div className="space-y-4 px-6 py-6">
        <ul className="space-y-2">
          {w06Queues.map((q) => (
            <li
              key={q.id}
              className={clsx(
                "rounded-[var(--radius-card)] border p-4 shadow-[var(--shadow-card)]",
                q.severity === "critical" && "border-red-c/40 bg-red-bg/40",
                q.severity === "watch" && "border-amber-w/40 bg-amber-bg/40",
                q.severity === "info" && "border-blue-i/30 bg-blue-bg/40",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-text">{q.issueType}</p>
                  <p className="text-sm text-text-muted">
                    {q.geography} · {q.owner} · {q.ageHours}h
                  </p>
                </div>
                {canApprove ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-lg bg-brand-700 px-3 py-1.5 text-sm font-semibold text-white"
                      onClick={() => setModal({ title: q.issueType })}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium"
                      onClick={() => setModal({ title: `Reject: ${q.issueType}` })}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-text-muted">Supervisor action required</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal
        open={!!modal}
        title={modal?.title ?? ""}
        onClose={() => setModal(null)}
        footer={
          <button
            type="button"
            className="rounded-lg bg-brand-700 px-3 py-1.5 text-sm font-semibold text-white"
            onClick={() => setModal(null)}
          >
            Confirm (demo)
          </button>
        }
      >
        <p className="text-sm text-text-muted">Decision recorded for demo. SLA timers and audit trail would attach in production.</p>
      </Modal>
    </AppShell>
  )
}
