import clsx from "clsx"
import { useMemo, useState, type ReactNode } from "react"

export interface Column<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  className?: string
  render?: (row: T) => ReactNode
}

function val<T extends object>(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key]
}

export function DataTable<T extends object>({
  columns,
  rows,
  rowKey,
  onRowClick,
}: {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  onRowClick?: (row: T) => void
}) {
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null)

  const sorted = useMemo(() => {
    if (!sort) return rows
    const { key, dir } = sort
    return [...rows].sort((a, b) => {
      const va = val(a, key)
      const vb = val(b, key)
      if (va == null) return 1
      if (vb == null) return -1
      if (typeof va === "number" && typeof vb === "number") {
        const c = va - vb
        return dir === "asc" ? c : -c
      }
      const c = String(va).localeCompare(String(vb))
      return dir === "asc" ? c : -c
    })
  }, [rows, sort])

  const toggle = (key: string, sortable?: boolean) => {
    if (!sortable) return
    setSort((s) => {
      if (!s || s.key !== key) return { key, dir: "asc" }
      if (s.dir === "asc") return { key, dir: "desc" }
      return null
    })
  }

  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-border bg-surface shadow-lg">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b-2 border-border bg-gradient-to-r from-surface-subtle to-brand-50/40 text-xs font-extrabold uppercase tracking-wider text-text-muted">
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)} className={clsx("px-5 py-4", c.className)}>
                <button
                  type="button"
                  disabled={!c.sortable}
                  onClick={() => toggle(String(c.key), c.sortable)}
                  className={clsx(
                    "flex items-center gap-2 transition-colors duration-200",
                    c.sortable && "cursor-pointer hover:text-brand-700",
                    !c.sortable && "cursor-default",
                  )}
                >
                  {c.header}
                  {c.sortable && sort?.key === String(c.key) ? (
                    <span className="text-brand-600 text-base">{sort.dir === "asc" ? "↑" : "↓"}</span>
                  ) : null}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, idx) => (
            <tr
              key={rowKey(row)}
              className={clsx(
                "border-b border-border last:border-0 transition-all duration-150 animate-fade-in",
                onRowClick && "cursor-pointer hover:bg-brand-50/70",
              )}
              onClick={() => onRowClick?.(row)}
              style={{ animationDelay: `${idx * 0.02}s` }}
            >
              {columns.map((c) => (
                <td key={String(c.key)} className={clsx("px-5 py-4 text-text font-medium", c.className)}>
                  {c.render ? c.render(row) : String(val(row, String(c.key)) ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
