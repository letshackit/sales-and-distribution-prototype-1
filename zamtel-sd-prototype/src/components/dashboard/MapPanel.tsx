import clsx from "clsx"
import type { MapLayer, MapZone } from "../../types/dashboard"

function getZoneStatus(zone: MapZone, layer: MapLayer): "healthy" | "watch" | "critical" {
  if (layer === "coverage") {
    if (zone.coverage < 0.6) return "critical"
    if (zone.coverage < 0.8) return "watch"
    return "healthy"
  } else {
    let v = 0
    if (layer === "liquidity") v = zone.liquidityRisk
    if (layer === "acquisition") v = zone.acquisitionGap
    if (layer === "risk") v = zone.riskScore
    
    if (v >= 0.45) return "critical"
    if (v >= 0.28) return "watch"
    return "healthy"
  }
}

function getZoneValue(zone: MapZone, layer: MapLayer): number {
  if (layer === "coverage") return zone.coverage
  if (layer === "liquidity") return zone.liquidityRisk
  if (layer === "acquisition") return zone.acquisitionGap
  if (layer === "risk") return zone.riskScore
  return 0
}

const layerLabels: Record<MapLayer, string> = {
  coverage: "Coverage",
  liquidity: "Liquidity risk",
  acquisition: "Acquisition gap",
  risk: "Risk composite",
}

const statusStyles = {
  healthy: {
    border: "border-brand-100 hover:border-brand-500",
    text: "text-brand-700",
    bar: "bg-brand-500",
    dot: "bg-brand-500",
    bg: "hover:bg-brand-50/50"
  },
  watch: {
    border: "border-amber-w/30 hover:border-amber-w",
    text: "text-amber-w",
    bar: "bg-amber-w",
    dot: "bg-amber-w",
    bg: "hover:bg-amber-bg/50"
  },
  critical: {
    border: "border-red-c/30 hover:border-red-c",
    text: "text-red-c",
    bar: "bg-red-c",
    dot: "bg-red-c",
    bg: "hover:bg-red-bg/50"
  }
}

export function MapPanel({
  zones,
  layer,
  onLayerChange,
  onZoneClick,
}: {
  zones: MapZone[]
  layer: MapLayer
  onLayerChange: (l: MapLayer) => void
  onZoneClick: (z: MapZone) => void
}) {
  // Abstract geographic layout for Zambia regions
  const gridLayout = [
    { id: "NORTH-KS", col: 2, row: 1 },
    { id: "COP-KW", col: 1, row: 2 },
    { id: "COP-ND", col: 2, row: 2 },
    { id: "LSK-CA", col: 2, row: 3 },
    { id: "LSK-CB", col: 3, row: 3 },
    { id: "LSK-EM", col: 1, row: 4 },
    { id: "SOUTH-MZ", col: 2, row: 4 },
    { id: "SOUTH-LV", col: 3, row: 4 },
  ]

  return (
    <div className="flex h-full min-h-[460px] flex-col rounded-2xl border-2 border-border bg-surface shadow-lg transition-all duration-300 hover:shadow-xl animate-fade-in overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-border bg-surface px-6 py-5">
        <div>
          <h3 className="text-base font-extrabold text-text">Geo Performance Map</h3>
          <p className="text-xs text-text-muted mt-1 font-medium">Abstract territory view • Click to drill down</p>
        </div>
        <div className="flex flex-wrap gap-2 rounded-xl bg-surface-subtle p-1 border border-border">
          {(Object.keys(layerLabels) as MapLayer[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => onLayerChange(l)}
              className={clsx(
                "rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200",
                layer === l
                  ? "bg-white text-brand-700 shadow-sm border border-border/50"
                  : "text-text-muted hover:text-text hover:bg-white/50 border border-transparent",
              )}
            >
              {layerLabels[l]}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-1">
        {/* Left: List view */}
        <div className="w-1/3 border-r-2 border-border bg-surface-subtle/30 overflow-y-auto hidden md:block">
          <div className="p-4 space-y-2">
            {zones.map((z) => {
              const status = getZoneStatus(z, layer)
              const val = getZoneValue(z, layer)
              const percentage = Math.round(val * 100)
              const styles = statusStyles[status]
              
              return (
                <button
                  key={`list-${z.id}`}
                  onClick={() => onZoneClick(z)}
                  className={clsx(
                    "w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm text-left group",
                    styles.border,
                    styles.bg,
                    "bg-surface"
                  )}
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <p className="text-sm font-bold text-text truncate group-hover:text-brand-700 transition-colors">{z.label}</p>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-subtle border border-border/50">
                      <div 
                        className={clsx("h-full rounded-full transition-all duration-1000", styles.bar)}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className={clsx("text-base font-extrabold tabular-nums", styles.text)}>
                      {percentage}{layer !== "risk" ? "%" : ""}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right: Abstract Map Grid */}
        <div className="flex-1 bg-gradient-to-br from-surface-subtle/50 to-brand-50/20 p-6 relative flex items-center justify-center min-h-[360px]">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#145a42_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative grid grid-cols-3 grid-rows-4 gap-4 w-full max-w-[500px] aspect-[3/4]">
            {gridLayout.map((pos) => {
              const z = zones.find(zone => zone.id === pos.id)
              if (!z) return null
              
              const status = getZoneStatus(z, layer)
              const val = getZoneValue(z, layer)
              const percentage = Math.round(val * 100)
              const styles = statusStyles[status]

              return (
                <button
                  key={`map-${z.id}`}
                  onClick={() => onZoneClick(z)}
                  className={clsx(
                    "relative flex flex-col items-center justify-center p-3 rounded-2xl border-2 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg group bg-surface z-10",
                    styles.border,
                    styles.bg
                  )}
                  style={{ 
                    gridColumn: pos.col, 
                    gridRow: pos.row,
                    animation: 'scaleIn 0.4s ease-out backwards',
                    animationDelay: `${(pos.row + pos.col) * 0.05}s`
                  }}
                >
                  <div className={clsx("absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full border-2 border-surface shadow-sm", styles.bar)} />
                  
                  <span className={clsx("text-2xl sm:text-3xl font-extrabold tabular-nums tracking-tighter mb-1", styles.text)}>
                    {percentage}{layer !== "risk" ? <span className="text-sm sm:text-base opacity-70">%</span> : ""}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-text-muted text-center leading-tight line-clamp-2 px-1 group-hover:text-text transition-colors">
                    {z.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-border bg-surface px-6 py-4">
        <div className="flex flex-wrap gap-6 text-xs font-bold text-text-muted">
          <span className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-brand-500 shadow-sm" /> Healthy
          </span>
          <span className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-amber-w shadow-sm" /> Watch
          </span>
          <span className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-red-c shadow-sm" /> Intervention
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted/60">
          Schematic Representation
        </span>
      </div>
    </div>
  )
}
