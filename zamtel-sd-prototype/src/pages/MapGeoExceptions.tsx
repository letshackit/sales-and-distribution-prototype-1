import { useState } from "react"
import { AlertListCard } from "../components/dashboard/AlertListCard"
import { MapPanel } from "../components/dashboard/MapPanel"
import { AppShell } from "../components/layout/AppShell"
import { PageHeader } from "../components/layout/PageHeader"
import { StickyFilterBar } from "../components/layout/StickyFilterBar"
import { useDemo } from "../context/DemoContext"
import { w01MapZones } from "../data/w01Seed"
import { w03Exceptions } from "../data/webScreensSeed"

export function MapGeoExceptions() {
  const { mapLayer, setMapLayer, exceptionSeverity, setExceptionSeverity } = useDemo()
  const [chip, setChip] = useState<"all" | "geo" | "route" | "manual">("all")

  return (
    <AppShell>
      <PageHeader title="Map &amp; geo exceptions" />
      <StickyFilterBar />
      <div className="space-y-4 px-6 py-6">
        <div className="flex flex-wrap gap-2">
          {(["all", "geo", "route", "manual"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setChip(c)}
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                chip === c ? "bg-brand-700 text-white" : "border border-border bg-surface text-text-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <MapPanel
              zones={w01MapZones}
              layer={mapLayer}
              onLayerChange={setMapLayer}
              onZoneClick={() => undefined}
            />
          </div>
          <AlertListCard
            title="Exception table (geo)"
            items={w03Exceptions}
            severityFilter={exceptionSeverity}
            onSeverityChange={setExceptionSeverity}
          />
        </div>
      </div>
    </AppShell>
  )
}
