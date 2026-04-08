import clsx from "clsx"
import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import {
  DynamicFormSection,
  EvidenceCapturePanel,
  FieldGroupCard,
  GeoStatusBadge,
  MobileHeader,
  OutletIdentityCard,
  ProgressStepper,
  StatusChipRow,
  StickyBottomActionBar,
  SyncFooter,
  ValidationBanner,
} from "../../components/mobile/visitPrimitives"
import { useMobileVisit } from "../../context/MobileVisitContext"
import type { RouteStop } from "../../types/mobileJourney"

function dayRouteMetrics(stops: RouteStop[]) {
  const routeDay = stops.filter((s) => s.status !== "blocked" && s.status !== "rescheduled")
  const done = routeDay.filter((s) => s.status === "completed").length
  const missed = routeDay.filter((s) => s.status === "missed").length
  const todo = routeDay.filter((s) => s.status === "planned" || s.status === "current").length
  const total = routeDay.length
  const progressPct = total > 0 ? Math.round((done / total) * 100) : 0
  return { done, missed, todo, total, progressPct, routeDay }
}

const btn = "flex w-full items-center justify-center rounded-xl bg-brand-700 py-3 text-sm font-semibold text-white hover:bg-brand-800"
const btnSec = "flex w-full items-center justify-center rounded-xl border border-border bg-surface py-3 text-sm font-semibold text-text"
const label = "text-xs font-semibold uppercase tracking-wide text-text-muted"
const input = "mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-sm"

export function M01Login() {
  const { state, login } = useMobileVisit()
  const [pin, setPin] = useState("")
  if (state.loggedIn) return <Navigate to="/mobile/today" replace />

  return (
    <div className="flex h-full min-h-0 w-full flex-col justify-center bg-brand-900 px-5 py-8 text-white">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-brand-100">Zamtel S&amp;D</p>
      <h1 className="mt-2 text-center text-2xl font-bold">Field login</h1>
      <p className="mt-2 text-center text-sm text-white/75">M01 · Device trust (demo)</p>
      <div className="mt-8 space-y-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
        <label className="block text-sm">
          Phone / ID
          <input className="mt-1 w-full rounded-lg border border-white/20 bg-brand-800 px-3 py-2 text-white" defaultValue="+260 *** ** 482" />
        </label>
        <label className="block text-sm">
          PIN
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/20 bg-brand-800 px-3 py-2 text-white"
          />
        </label>
        <button type="button" className={clsx(btn, "bg-white text-brand-900 hover:bg-brand-50")} onClick={() => login()}>
          Verify &amp; continue
        </button>
      </div>
      <p className="mt-6 text-center text-xs text-white/60">Assigned: ASE · Lusaka Central A (preview)</p>
    </div>
  )
}

export function M02Today() {
  const { state, beginCheckIn } = useMobileVisit()
  const nav = useNavigate()
  if (!state.loggedIn) return <Navigate to="/mobile/login" replace />

  const dayComplete = state.dayComplete || state.attendance === "complete"
  const { done, missed, todo, total, progressPct } = dayRouteMetrics(state.stops)
  const activeStop =
    state.stops.find((s) => s.status === "current") ?? state.stops.find((s) => s.status === "planned")

  const startVisit = () => {
    if (!activeStop) return
    beginCheckIn(activeStop.id)
    nav("/mobile/check-in")
  }

  return (
    <div className="space-y-4 pb-28">
      <MobileHeader
        title="Today"
        subtitle={`${state.userName} · ${state.territory}`}
      />
      <StatusChipRow
        gps={state.gps}
        offline={state.offline}
        pendingSync={state.pendingSync}
        pendingApproval={state.pendingApprovalCount}
      />
      <p className="text-xs text-text-muted">
        {new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
      </p>

      <div className="rounded-2xl border border-border bg-surface p-4">
        <p className={label}>Attendance</p>
        <p className="mt-1 font-semibold text-text capitalize">{state.attendance.replace("_", " ")}</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-4">
        <p className={label}>Route progress (live)</p>
        <p className="mt-2 text-2xl font-bold text-brand-800">
          {done} / {total} completed
        </p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-subtle">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="mt-2 text-xs text-text-muted">
          {todo > 0 ? `${todo} stop(s) remaining · ` : "Day route clear · "}
          sync queue: {state.pendingSync}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ["Route stops", String(total)],
          ["Done", String(done)],
          ["Open", String(todo)],
          ["Missed", String(missed)],
        ].map(([a, b]) => (
          <div key={a} className="rounded-xl bg-surface-subtle py-3 text-center">
            <p className="text-xl font-bold text-brand-800">{b}</p>
            <p className="text-[10px] font-semibold uppercase text-text-muted">{a}</p>
          </div>
        ))}
      </div>

      {state.pendingApprovalCount > 0 ? (
        <ValidationBanner variant="warning" title={`${state.pendingApprovalCount} submissions awaiting approval`}>
          Supervisor queue will clear after TL review (demo).
        </ValidationBanner>
      ) : null}

      <OutletIdentityCard name={state.outlet.name} id={state.outlet.id} type={state.outlet.type} />

      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={btn} onClick={startVisit} disabled={dayComplete || !activeStop}>
          Start visit
        </button>
        <button type="button" className={btnSec} onClick={() => nav("/mobile/route")}>
          View route
        </button>
        <button type="button" className={btnSec} onClick={() => nav("/mobile/tasks")}>
          Resume draft
        </button>
        <button type="button" className={btnSec} onClick={() => nav("/mobile/eod")}>
          End day
        </button>
      </div>

      <SyncFooter pendingSync={state.pendingSync} to="/mobile/sync" />

      {state.offline ? (
        <ValidationBanner variant="warning" title="Offline mode">Queued captures sync when connectivity returns.</ValidationBanner>
      ) : null}
    </div>
  )
}

export function M03Route() {
  const nav = useNavigate()
  const { state, beginCheckIn } = useMobileVisit()
  const visitable = state.stops.filter((s) => s.status !== "blocked" && s.status !== "rescheduled").length
  const currentSeq = state.stops.find((s) => s.status === "current")?.seq

  const goCheckIn = (stopId: string) => {
    beginCheckIn(stopId)
    nav("/mobile/check-in")
  }

  return (
    <div className="space-y-3 pb-6">
      <MobileHeader title="Route plan" subtitle="M03 · ordered day plan" />
      <div className="rounded-xl border border-border bg-surface-subtle px-3 py-2 text-sm">
        {visitable} active stops · ~14 km · est. 6h 10m
        {currentSeq ? ` · Seq ${currentSeq} focused` : ""}
      </div>
      <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-border bg-surface text-xs text-text-muted">
        Route map preview (demo)
      </div>
      <ul className="space-y-2">
        {state.stops.map((o) => {
          const canCheckIn = o.status === "current" || o.status === "planned"
          return (
          <li
            key={o.id}
            className={clsx(
              "rounded-2xl border p-3",
              o.status === "current" && "border-brand-600 bg-brand-50 ring-2 ring-brand-600/40",
              o.status === "missed" && "border-red-c/40 bg-red-bg/40",
              o.status === "planned" && "border-border bg-surface",
              o.status === "completed" && "border-brand-600/20 bg-surface-subtle opacity-80",
              o.status === "rescheduled" && "border-amber-w/40 bg-amber-bg/30",
              o.status === "blocked" && "border-border bg-surface-subtle",
            )}
          >
            <div className="flex justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase text-text-muted">
                  #{o.seq} · {o.priority} · {o.status}
                </p>
                <p className="font-semibold text-text">{o.name}</p>
                <p className="text-xs text-text-muted">
                  {o.type} · {o.window} · {o.dist}
                </p>
              </div>
              {canCheckIn ? (
                <button
                  type="button"
                  className="shrink-0 self-center rounded-lg bg-brand-700 px-3 py-2 text-xs font-semibold text-white"
                  onClick={() => goCheckIn(o.id)}
                >
                  {o.status === "current" ? "Check-in" : "Go"}
                </button>
              ) : (
                <span className="shrink-0 self-center text-[10px] font-bold uppercase text-text-muted">{o.status}</span>
              )}
            </div>
          </li>
          )
        })}
      </ul>
    </div>
  )
}

export function M04CheckIn() {
  const { state, setGps, setOffline } = useMobileVisit()
  const nav = useNavigate()

  useEffect(() => {
    setGps("locating")
    const t = window.setTimeout(() => setGps("valid"), 900)
    return () => window.clearTimeout(t)
  }, [setGps])

  return (
    <div className="space-y-4 pb-28">
      <MobileHeader title="Outlet check-in" subtitle="M04 · validation gate" />
      <ProgressStepper current={1} total={5} />
      <OutletIdentityCard name={state.outlet.name} id={state.outlet.id} type={state.outlet.type} />

      <div className="rounded-2xl border border-border p-4">
        <p className={label}>GPS acquisition</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <GeoStatusBadge state={state.gps} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className="text-xs font-semibold text-brand-700" onClick={() => setGps("locating")}>
            Relocate
          </button>
          <button type="button" className="text-xs font-semibold text-brand-700" onClick={() => setGps("valid")}>
            Simulate fix
          </button>
          <button type="button" className="text-xs text-amber-w" onClick={() => setGps("weak")}>
            Weak signal
          </button>
          <button type="button" className="text-xs text-red-c" onClick={() => setGps("blocked")}>
            Blocked
          </button>
          <button type="button" className="text-xs text-text-muted" onClick={() => setOffline(true)}>
            Offline
          </button>
        </div>
      </div>
      <div className="rounded-2xl border border-border p-4 text-sm">
        <p className={label}>Geo-fence</p>
        <p className="mt-1">{state.gps === "blocked" ? "Outside tolerance — supervisor override required" : "Inside trade area (demo)"}</p>
        <p className="mt-2 text-xs text-text-muted">Check-in timestamp: {new Date().toLocaleTimeString()} (system)</p>
      </div>

      {state.gps === "locating" ? (
        <ValidationBanner variant="info" title="Acquiring GPS…">Hold steady — auto-validation runs on fix.</ValidationBanner>
      ) : null}
      {state.gps === "weak" ? (
        <ValidationBanner variant="warning" title="Weak signal">Accuracy reduced — continue only if you are visibly at the outlet.</ValidationBanner>
      ) : null}
      {state.gps === "blocked" ? (
        <ValidationBanner variant="danger" title="Blocked — outside geo-fence">Request supervisor override to proceed without moving.</ValidationBanner>
      ) : null}

      <StickyBottomActionBar
        primaryLabel="Continue to visit type"
        disabled={state.gps === "blocked" && !state.offline}
        onPrimary={() => nav("/mobile/visit-type")}
        secondary={
          state.gps === "blocked" ? (
            <button type="button" className="w-full rounded-xl border border-border bg-surface py-3 text-sm font-semibold text-text">
              Request supervisor override
            </button>
          ) : null
        }
      />

      {state.offline ? (
        <ValidationBanner variant="danger" title="Offline manual location (audit)">
          Strong audit warning — TL approval required before dashboards consume this visit.
        </ValidationBanner>
      ) : null}
    </div>
  )
}

const visitTypes = [
  { id: "react", title: "Reactivation / Recruitment", desc: "Agent onboarding" },
  { id: "sim", title: "SIM registration", desc: "Counts & channel" },
  { id: "float", title: "Float & cash check", desc: "Liquidity capture" },
  { id: "prospect", title: "Prospecting", desc: "Lead capture" },
  { id: "master", title: "Master agent / stock", desc: "Support visit" },
  { id: "missed", title: "Mark missed visit", desc: "Exception path" },
]

export function M05VisitType() {
  const { state, setVisitType } = useMobileVisit()
  const [sel, setSel] = useState<string | null>(null)
  const nav = useNavigate()

  return (
    <div className="space-y-4 pb-28">
      <ProgressStepper current={2} total={5} />
      <OutletIdentityCard name={state.outlet.name} id={state.outlet.id} type={state.outlet.type} />
      <MobileHeader title="Visit purpose" subtitle="M05 · choose capture path" />

      <div className="space-y-2">
        {visitTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSel(t.id)}
            className={clsx(
              "min-h-[56px] w-full rounded-2xl border px-4 py-3 text-left transition active:scale-[0.99]",
              sel === t.id ? "border-brand-600 bg-brand-50 ring-2 ring-brand-600/30" : "border-border bg-surface",
            )}
          >
            <p className="font-semibold text-text">{t.title}</p>
            <p className="text-xs text-text-muted">{t.desc}</p>
          </button>
        ))}
      </div>

      <StickyBottomActionBar
        primaryLabel="Continue"
        disabled={!sel}
        onPrimary={() => {
          if (!sel) return
          setVisitType(sel)
          if (sel === "missed") nav("/mobile/missed")
          else if (sel === "sim") nav("/mobile/form/sim")
          else if (sel === "float") nav("/mobile/form/float")
          else if (sel === "prospect") nav("/mobile/form/prospect")
          else if (sel === "master") nav("/mobile/form/master")
          else nav("/mobile/form/recruitment")
        }}
      />
    </div>
  )
}

export function M06Recruitment() {
  const { state, patchDraft } = useMobileVisit()
  const open = state.drafts.recruitment.openSection
  const setOpen = (i: number) => patchDraft("recruitment", { openSection: i })
  const nav = useNavigate()
  const sections = [
    { title: "Agent identification", required: true },
    { title: "Prospective agent details", required: true },
    { title: "KYC checklist", required: true },
    { title: "Document capture", required: false },
    { title: "Code / reactivation status", required: true },
    { title: "Initial float deposit", required: false },
    { title: "Final outcome", required: true },
  ]
  return (
    <div className="space-y-2 pb-24">
      <MobileHeader title="Recruitment / reactivation" subtitle="M06 · guided sections" />
      <ProgressStepper current={3} total={5} />
      {sections.map((s, i) => (
        <DynamicFormSection
          key={s.title}
          title={s.title}
          required={s.required}
          open={open === i}
          complete={i < 2}
          onToggle={() => setOpen(i)}
        >
          <label className={label}>
            Agent / prospect ID
            <input
              className={input}
              placeholder="Capture"
              value={state.drafts.recruitment.agentId}
              onChange={(e) => patchDraft("recruitment", { agentId: e.target.value })}
            />
          </label>
          <label className={label}>
            Prospect name
            <input
              className={input}
              value={state.drafts.recruitment.prospectName}
              onChange={(e) => patchDraft("recruitment", { prospectName: e.target.value })}
            />
          </label>
        </DynamicFormSection>
      ))}
      <button type="button" className={btnSec} onClick={() => undefined}>
        Save draft
      </button>
      <button type="button" className={btn} onClick={() => nav("/mobile/proof")}>
        Next: proof
      </button>
    </div>
  )
}

export function M07SimReg() {
  const { state, patchDraft } = useMobileVisit()
  const d = state.drafts.sim
  const nav = useNavigate()
  const countInvalid = Number.isNaN(Number(d.registrations)) || Number(d.registrations) < 0
  return (
    <div className="space-y-3 pb-24">
      <MobileHeader title="SIM registration" subtitle="M07 · numeric-first capture" />
      <p className="text-[11px] text-text-muted">Draft persists across refresh (local storage).</p>
      <FieldGroupCard label="Performance">
        <label className={label}>
          Registrations count
          <input
            type="number"
            inputMode="numeric"
            className={input}
            value={d.registrations}
            onChange={(e) => patchDraft("sim", { registrations: e.target.value })}
          />
        </label>
        {countInvalid ? <p className="mt-1 text-xs text-red-c">Enter a valid non-negative number</p> : null}
      </FieldGroupCard>
      <label className={label}>
        Sales channel
        <select className={input} value={d.channel} onChange={(e) => patchDraft("sim", { channel: e.target.value })}>
          <option>Retail</option>
          <option>Agent</option>
        </select>
      </label>
      <label className={label}>
        Campaign / source
        <input className={input} value={d.campaign} onChange={(e) => patchDraft("sim", { campaign: e.target.value })} />
      </label>
      <label className={label}>
        Notes
        <textarea className={input} rows={2} value={d.notes} onChange={(e) => patchDraft("sim", { notes: e.target.value })} />
      </label>
      <label className={label}>
        Activation follow-up state
        <select
          className={input}
          value={d.activationState}
          onChange={(e) => patchDraft("sim", { activationState: e.target.value })}
        >
          <option>Expect activation within 24h</option>
          <option>Follow-up call scheduled</option>
          <option>No activation expected</option>
        </select>
      </label>
      <button type="button" className={btnSec} onClick={() => undefined}>
        Save draft
      </button>
      <button type="button" className={btn} disabled={countInvalid} onClick={() => nav("/mobile/proof")}>
        Continue
      </button>
    </div>
  )
}

export function M08FloatCash() {
  const { state, patchDraft } = useMobileVisit()
  const f = state.drafts.float
  const nav = useNavigate()
  const adequacy = f.adequacy
  const severity = adequacy === "critical" ? "critical" : adequacy === "low" ? "watch" : "healthy"
  return (
    <div className="space-y-3 pb-24">
      <MobileHeader title="Float & cash check" subtitle="M08 · liquidity capture" />
      <label className={label}>
        Float balance (ZMW)
        <input
          className={clsx(input, "text-lg font-semibold tabular-nums")}
          value={f.floatBalance}
          onChange={(e) => patchDraft("float", { floatBalance: e.target.value })}
        />
      </label>
      <label className={label}>
        Cash on hand (ZMW)
        <input
          className={clsx(input, "text-lg font-semibold tabular-nums")}
          value={f.cashOnHand}
          onChange={(e) => patchDraft("float", { cashOnHand: e.target.value })}
        />
      </label>
      <div>
        <p className={label}>Adequacy (segmented)</p>
        <div className="mt-1 flex gap-1 rounded-xl border border-border p-1">
          {(
            [
              ["ok", "OK"],
              ["low", "Low"],
              ["critical", "Critical"],
            ] as const
          ).map(([k, text]) => (
            <button
              key={k}
              type="button"
              onClick={() => patchDraft("float", { adequacy: k })}
              className={clsx(
                "flex-1 rounded-lg py-2 text-xs font-semibold",
                adequacy === k ? "bg-brand-700 text-white" : "text-text-muted",
              )}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
      <label className={label}>
        Branding check
        <select className={input} value={f.branding} onChange={(e) => patchDraft("float", { branding: e.target.value })}>
          <option>Full</option>
          <option>Partial</option>
          <option>None</option>
        </select>
      </label>
      <label className={label}>
        Rebalancer available
        <select className={input} value={f.rebalancer} onChange={(e) => patchDraft("float", { rebalancer: e.target.value })}>
          <option>Yes</option>
          <option>No</option>
        </select>
      </label>
      <label className={label}>
        Top-up needed
        <select className={input} value={f.topUp} onChange={(e) => patchDraft("float", { topUp: e.target.value })}>
          <option>No</option>
          <option>Yes</option>
        </select>
      </label>
      <label className={label}>
        Issue notes
        <textarea className={input} rows={2} value={f.notes} onChange={(e) => patchDraft("float", { notes: e.target.value })} />
      </label>
      <ValidationBanner
        variant={severity === "critical" ? "danger" : severity === "watch" ? "warning" : "info"}
        title={`Severity summary: ${severity}`}
      >
        Dashboards will tag this visit with liquidity stress for W07 routing (demo).
      </ValidationBanner>
      <button type="button" className={btnSec} onClick={() => undefined}>
        Save draft
      </button>
      <button type="button" className={btn} onClick={() => nav("/mobile/proof")}>
        Continue
      </button>
    </div>
  )
}

export function M09Prospect() {
  const { state, patchDraft } = useMobileVisit()
  const p = state.drafts.prospect
  const nav = useNavigate()
  return (
    <div className="space-y-3 pb-24">
      <h1 className="text-lg font-bold">M09 · Prospecting</h1>
      <label className={label}>
        Customer type
        <select
          className={input}
          value={p.customerType}
          onChange={(e) => patchDraft("prospect", { customerType: e.target.value })}
        >
          <option>Consumer</option>
          <option>SME</option>
        </select>
      </label>
      <label className={label}>
        Product pitched
        <input className={input} value={p.product} onChange={(e) => patchDraft("prospect", { product: e.target.value })} />
      </label>
      <label className={label}>
        Interest
        <select className={input} value={p.interest} onChange={(e) => patchDraft("prospect", { interest: e.target.value })}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </label>
      <label className={label}>
        Follow-up date
        <input
          type="date"
          className={input}
          value={p.followUp}
          onChange={(e) => patchDraft("prospect", { followUp: e.target.value })}
        />
      </label>
      <label className={label}>
        Phone
        <input className={input} value={p.phone} onChange={(e) => patchDraft("prospect", { phone: e.target.value })} />
      </label>
      <p className="rounded-xl bg-brand-50 px-3 py-2 text-xs text-brand-900">Phone format valid · No duplicate lead (demo)</p>
      <button type="button" className={btn} onClick={() => nav("/mobile/proof")}>
        Continue
      </button>
    </div>
  )
}

export function M10MasterAgent() {
  const { state, patchDraft } = useMobileVisit()
  const m = state.drafts.master
  const nav = useNavigate()
  const rows: [keyof typeof m, string][] = [
    ["stockState", "Stock state"],
    ["floatSupport", "Float support need"],
    ["replenishment", "Replenishment request"],
    ["lastTopUpRef", "Last top-up ref"],
    ["issueType", "Issue type"],
    ["actionTaken", "Action taken"],
    ["followUp", "Follow-up"],
  ]
  return (
    <div className="space-y-3 pb-24">
      <h1 className="text-lg font-bold">M10 · Master agent support</h1>
      {rows.map(([key, lbl]) => (
        <label key={key} className={label}>
          {lbl}
          <input
            className={input}
            value={m[key]}
            onChange={(e) => patchDraft("master", { [key]: e.target.value })}
          />
        </label>
      ))}
      <button type="button" className={btn} onClick={() => nav("/mobile/proof")}>
        Continue
      </button>
    </div>
  )
}

export function M11Proof() {
  const { setProofCaptured } = useMobileVisit()
  const [ok, setOk] = useState(false)
  const nav = useNavigate()
  const quality = ok ? "Pass — sharp / lit" : "Not captured"

  return (
    <div className="space-y-4 pb-24">
      <MobileHeader title="Proof of visit" subtitle="M11 · geo-tagged evidence" />
      <ProgressStepper current={4} total={5} />
      <EvidenceCapturePanel
        captured={ok}
        onCapture={() => {
          setOk(true)
          setProofCaptured(true)
        }}
        onRetake={() => {
          setOk(false)
          setProofCaptured(false)
        }}
      />
      <div className="rounded-2xl border border-border p-3 text-xs text-text-muted">
        <p>Timestamp: {new Date().toLocaleString()}</p>
        <p>GPS valid: {ok ? "Yes · -15.42, 28.32" : "Pending capture"}</p>
        <p>Distance tolerance: {ok ? "Inside 25m radius" : "—"}</p>
        <p className={ok ? "font-semibold text-brand-700" : ""}>Image quality: {quality}</p>
      </div>
      {!ok ? (
        <ValidationBanner variant="warning" title="Evidence required">
          Photo must pass quality + GPS checks before continue.
        </ValidationBanner>
      ) : null}
      <button type="button" disabled={!ok} className={btn} onClick={() => nav("/mobile/compliance")}>
        Continue
      </button>
    </div>
  )
}

const competitorOptions = ["Airtel", "MTN", "Zed Mobile", "Other"]

export function M12Compliance() {
  const { state, completeVisit, patchDraft } = useMobileVisit()
  const c = state.drafts.compliance
  const nav = useNavigate()
  const [extraPhoto, setExtraPhoto] = useState(false)

  const toggleComp = (comp: string) => {
    const competitors = c.competitors.includes(comp)
      ? c.competitors.filter((x) => x !== comp)
      : [...c.competitors, comp]
    patchDraft("compliance", { competitors })
  }

  return (
    <div className="space-y-3 pb-24">
      <MobileHeader title="Compliance & market intel" subtitle="M12 · structured + fast" />
      <ProgressStepper current={5} total={5} />
      <label className={label}>
        Branding availability
        <select className={input} value={c.branding} onChange={(e) => patchDraft("compliance", { branding: e.target.value })}>
          <option>Full</option>
          <option>Partial</option>
          <option>None</option>
        </select>
      </label>
      <label className={label}>
        Pricing compliance
        <select className={input} value={c.pricing} onChange={(e) => patchDraft("compliance", { pricing: e.target.value })}>
          <option>OK</option>
          <option>Violation</option>
        </select>
      </label>

      <div>
        <p className={label}>Competitor presence (multi-select)</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {competitorOptions.map((x) => (
            <button
              key={x}
              type="button"
              onClick={() => toggleComp(x)}
              className={clsx(
                "rounded-full border px-3 py-1 text-xs font-semibold",
                c.competitors.includes(x) ? "border-brand-600 bg-brand-50 text-brand-900" : "border-border text-text-muted",
              )}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      <label className={label}>
        Competitor offers (short notes)
        <textarea
          className={input}
          rows={2}
          placeholder="e.g. Double data Friday"
          value={c.competitorNotes}
          onChange={(e) => patchDraft("compliance", { competitorNotes: e.target.value })}
        />
      </label>
      <label className={label}>
        Risk / fraud flag
        <select className={input} value={c.riskFlag} onChange={(e) => patchDraft("compliance", { riskFlag: e.target.value })}>
          <option>None</option>
          <option>Suspicious</option>
        </select>
      </label>
      <label className={label}>
        Service issue
        <input
          className={input}
          placeholder="Intermittent network"
          value={c.serviceIssue}
          onChange={(e) => patchDraft("compliance", { serviceIssue: e.target.value })}
        />
      </label>
      <label className={label}>
        Customer feedback
        <textarea
          className={input}
          rows={2}
          value={c.feedback}
          onChange={(e) => patchDraft("compliance", { feedback: e.target.value })}
        />
      </label>

      <label className="flex items-center gap-2 text-sm font-medium text-text">
        <input type="checkbox" checked={extraPhoto} onChange={(e) => setExtraPhoto(e.target.checked)} />
        Optional intel photo
      </label>
      {extraPhoto ? (
        <div className="rounded-xl border border-dashed border-border bg-surface-subtle py-8 text-center text-xs text-text-muted">
          Evidence picker (placeholder)
        </div>
      ) : null}

      <button type="button" className={btnSec} onClick={() => undefined}>
        Save draft
      </button>
      <button
        type="button"
        className={btn}
        onClick={() => {
          completeVisit()
          nav("/mobile/today")
        }}
      >
        Submit visit
      </button>
    </div>
  )
}

export function M13Missed() {
  const { recordMissedVisit } = useMobileVisit()
  const nav = useNavigate()
  const [reason, setReason] = useState("Outlet closed")
  const [note, setNote] = useState("")
  return (
    <div className="space-y-3 pb-24">
      <h1 className="text-lg font-bold">M13 · Missed visit</h1>
      <label className={label}>
        Reason
        <select className={input} value={reason} onChange={(e) => setReason(e.target.value)}>
          <option>Outlet closed</option>
          <option>Agent absent</option>
          <option>Security / access</option>
          <option>Network</option>
        </select>
      </label>
      <label className={label}>
        Note
        <textarea className={input} rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
      </label>
      <button
        type="button"
        className={btn}
        onClick={() => {
          recordMissedVisit(note ? `${reason}: ${note}` : reason)
          nav("/mobile/today")
        }}
      >
        Submit
      </button>
    </div>
  )
}

export function M14Eod() {
  const { state, setDayComplete, fieldMinutesAccumulated } = useMobileVisit()
  const nav = useNavigate()
  const { done, missed, total } = dayRouteMetrics(state.stops)
  const fh = Math.floor(fieldMinutesAccumulated / 60)
  const fm = fieldMinutesAccumulated % 60
  const visitsLogged = state.visitLog.length

  return (
    <div className="space-y-3 pb-24">
      <h1 className="text-lg font-bold">M14 · End of day</h1>
      <ul className="space-y-1 rounded-2xl border border-border bg-surface p-3 text-sm">
        <li>Route stops (excl. blocked / rescheduled): {total}</li>
        <li>Completed stops: {done}</li>
        <li>Missed stops: {missed}</li>
        <li>Visits logged this session: {visitsLogged}</li>
        <li>
          Field time (demo clock): {fh}h {fm.toString().padStart(2, "0")}m
        </li>
        <li>Offline mode captures: {state.offline ? "1+" : "0"} (demo)</li>
        <li>Pending approvals: {state.pendingApprovalCount}</li>
        <li>Queued for sync: {state.pendingSync}</li>
      </ul>
      <button
        type="button"
        className={btn}
        onClick={() => {
          setDayComplete(true)
          nav("/mobile/sync")
        }}
      >
        Check-out &amp; sync
      </button>
    </div>
  )
}

export function M15Sync() {
  const { state, runSync } = useMobileVisit()
  const busy = state.syncPhase === "syncing"
  return (
    <div className="space-y-3 pb-24">
      <h1 className="text-lg font-bold">M15 · Sync center</h1>
      <div className="rounded-2xl border border-border p-4 text-sm">
        <p>Synced (device ack): {state.syncedCount}</p>
        <p className="text-amber-w">Pending queue: {state.pendingSync}</p>
        <p className="text-red-c">Failed batches (demo): {state.failedSyncCount}</p>
        {state.syncPhase === "error" && state.pendingSync > 0 ? (
          <p className="mt-2 text-xs font-medium text-amber-w">Partial sync — tap retry to send remaining items.</p>
        ) : null}
        <p className="mt-2 text-xs text-text-muted">
          Uses mock API latency (~0.5s). Visits are persisted locally until ack.
        </p>
      </div>
      <button
        type="button"
        className={btn}
        onClick={() => void runSync()}
        disabled={state.pendingSync === 0 || busy}
      >
        {busy ? "Syncing…" : state.pendingSync === 0 ? "Queue clear" : "Retry sync"}
      </button>
    </div>
  )
}

export function M16History() {
  const { state } = useMobileVisit()
  const rows = [...state.visitLog].reverse()

  return (
    <div className="space-y-3 pb-24">
      <h1 className="text-lg font-bold">M16 · Visit history</h1>
      {rows.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface-subtle p-4 text-sm text-text-muted">
          No visits in this session yet. Complete a visit from Today → Route → Check-in flow to populate this list.
        </p>
      ) : (
        <ul className="space-y-2">
          {rows.map((r) => (
            <li key={r.id} className="rounded-2xl border border-border bg-surface p-3 text-sm">
              <p className="font-semibold">
                {r.outletName}{" "}
                <span className="text-xs font-normal text-text-muted">({r.outletId})</span>
              </p>
              <p className="text-text-muted">
                {new Date(r.at).toLocaleString()} · {r.visitType} ·{" "}
                <span className={r.outcome === "missed" ? "text-red-c font-medium" : "text-brand-800 font-medium"}>
                  {r.outcome}
                </span>
              </p>
              {r.payloadSummary ? <p className="mt-1 text-xs text-brand-800">{r.payloadSummary}</p> : null}
              {r.note ? <p className="mt-1 text-xs text-text-muted">{r.note}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function MobileTasksHub() {
  const { state } = useMobileVisit()
  return (
    <div className="space-y-3 pb-24">
      <h1 className="text-lg font-bold">Tasks</h1>
      <p className="text-xs text-text-muted">
        Drafts sync to browser storage. Queue: {state.pendingSync} pending.
      </p>
      <Link to="/mobile/form/recruitment" className="block rounded-2xl border border-border bg-surface p-4 text-sm font-medium">
        Resume draft · Recruitment
      </Link>
      <Link to="/mobile/sync" className="block rounded-2xl border border-border bg-surface p-4 text-sm font-medium">
        Review sync queue
      </Link>
    </div>
  )
}
