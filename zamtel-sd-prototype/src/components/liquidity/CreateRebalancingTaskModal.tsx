import { Modal } from "../common/Modal"

export function CreateRebalancingTaskModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <Modal
      open={open}
      title="Create rebalancing task"
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <button type="button" className="rounded-lg border border-border px-3 py-1.5 text-sm" onClick={onClose}>
            Discard
          </button>
          <button
            type="button"
            className="rounded-lg bg-brand-700 px-3 py-1.5 text-sm font-semibold text-white"
            onClick={onClose}
          >
            Save (demo)
          </button>
        </div>
      }
    >
      <div className="space-y-3 text-sm">
        <label className="block">
          <span className="text-xs font-semibold text-text-muted">From agent / pool</span>
          <select className="mt-1 w-full rounded-lg border border-border px-2 py-2">
            <option>Dormant float — Cairo Road</option>
            <option>Regional float account — Lusaka</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-text-muted">To territory / agent</span>
          <select className="mt-1 w-full rounded-lg border border-border px-2 py-2">
            <option>Lusaka East Market Route</option>
            <option>Ndola CBD cluster</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-text-muted">Amount (ZMW)</span>
          <input type="number" className="mt-1 w-full rounded-lg border border-border px-2 py-2" defaultValue={25000} />
        </label>
        <p className="text-xs text-text-muted">
          Demo only — posts to liquidity workflow with approvers per A06 in production.
        </p>
      </div>
    </Modal>
  )
}
