import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AdminShell } from "./components/admin/AdminShell"
import { MobilePhoneRoot } from "./components/mobile/MobilePhoneRoot"
import { MobileShell } from "./components/mobile/MobileShell"
import { DemoProvider } from "./context/DemoContext"
import { MobileVisitProvider } from "./context/MobileVisitContext"
import { AcquisitionDashboard } from "./pages/AcquisitionDashboard"
import { Agent360 } from "./pages/Agent360"
import { WebExceptionQueue } from "./pages/ExceptionQueue"
import { ExecutiveDashboard } from "./pages/ExecutiveDashboard"
import { FieldExecutionDashboard } from "./pages/FieldExecutionDashboard"
import { FloatRebalancingLog } from "./pages/FloatRebalancingLog"
import { Leaderboards } from "./pages/Leaderboards"
import { LiquidityControlRoom } from "./pages/LiquidityControlRoom"
import { MapGeoExceptions } from "./pages/MapGeoExceptions"
import { OutletCoverage } from "./pages/OutletCoverage"
import { RecruitmentPipeline } from "./pages/RecruitmentPipeline"
import { ReportsExports } from "./pages/ReportsExports"
import { A01Users } from "./pages/admin/A01Users"
import { A02Territory } from "./pages/admin/A02Territory"
import { A03Outlets } from "./pages/admin/A03Outlets"
import { A04FormConfigurator } from "./pages/admin/A04FormConfigurator"
import { A05Thresholds } from "./pages/admin/A05Thresholds"
import { A06Workflows } from "./pages/admin/A06Workflows"
import { A07Audit } from "./pages/admin/A07Audit"
import { A08Integrations } from "./pages/admin/A08Integrations"
import {
  M01Login,
  M02Today,
  M03Route,
  M04CheckIn,
  M05VisitType,
  M06Recruitment,
  M07SimReg,
  M08FloatCash,
  M09Prospect,
  M10MasterAgent,
  M11Proof,
  M12Compliance,
  M13Missed,
  M14Eod,
  M15Sync,
  M16History,
  MobileTasksHub,
} from "./pages/mobile/VisitScreens"

export default function App() {
  return (
    <DemoProvider>
      <MobileVisitProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<ExecutiveDashboard />} />
            <Route path="/field" element={<FieldExecutionDashboard />} />
            <Route path="/map" element={<MapGeoExceptions />} />
            <Route path="/coverage" element={<OutletCoverage />} />
            <Route path="/agent" element={<Agent360 />} />
            <Route path="/exceptions" element={<WebExceptionQueue />} />
            <Route path="/liquidity" element={<LiquidityControlRoom />} />
            <Route path="/rebalancing" element={<FloatRebalancingLog />} />
            <Route path="/acquisition" element={<AcquisitionDashboard />} />
            <Route path="/recruitment" element={<RecruitmentPipeline />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/reports" element={<ReportsExports />} />

            <Route path="/mobile" element={<MobilePhoneRoot />}>
              <Route path="login" element={<M01Login />} />
              <Route element={<MobileShell />}>
                <Route index element={<Navigate to="today" replace />} />
                <Route path="today" element={<M02Today />} />
                <Route path="route" element={<M03Route />} />
                <Route path="tasks" element={<MobileTasksHub />} />
                <Route path="history" element={<M16History />} />
                <Route path="sync" element={<M15Sync />} />
                <Route path="check-in" element={<M04CheckIn />} />
                <Route path="visit-type" element={<M05VisitType />} />
                <Route path="form/recruitment" element={<M06Recruitment />} />
                <Route path="form/sim" element={<M07SimReg />} />
                <Route path="form/float" element={<M08FloatCash />} />
                <Route path="form/prospect" element={<M09Prospect />} />
                <Route path="form/master" element={<M10MasterAgent />} />
                <Route path="proof" element={<M11Proof />} />
                <Route path="compliance" element={<M12Compliance />} />
                <Route path="missed" element={<M13Missed />} />
                <Route path="eod" element={<M14Eod />} />
              </Route>
            </Route>

            <Route path="/admin" element={<AdminShell />}>
              <Route index element={<Navigate to="/admin/users" replace />} />
              <Route path="users" element={<A01Users />} />
              <Route path="territory" element={<A02Territory />} />
              <Route path="outlets" element={<A03Outlets />} />
              <Route path="forms" element={<A04FormConfigurator />} />
              <Route path="thresholds" element={<A05Thresholds />} />
              <Route path="workflows" element={<A06Workflows />} />
              <Route path="audit" element={<A07Audit />} />
              <Route path="integrations" element={<A08Integrations />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MobileVisitProvider>
    </DemoProvider>
  )
}
