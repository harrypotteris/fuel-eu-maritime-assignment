import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import RoutesPage from "@/pages/RoutesPage";
import {ComparePage }from "@/pages/ComparePage";
import {BankingPage }from "@/pages/BankingPage";
import PoolingPage from "@/pages/PoolingPage";

function App() {
  return (
    <Routes>
      {/* Redirect / → /routes */}
      <Route path="/" element={<Navigate to="/routes" replace />} />

      {/* Layout with nested routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/banking" element={<BankingPage />} />
        <Route path="/pooling" element={<PoolingPage />} />
      </Route>
    </Routes>
  );
  
}

export default App;
