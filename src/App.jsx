import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GlobalLoader } from '@/components/ui/GlobalLoader'
import { AuthPageTransition } from '@/components/auth/AuthPageTransition'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PublicOnlyRoute } from '@/components/auth/PublicOnlyRoute'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { DashboardHome } from '@/pages/DashboardHome'
import { DashboardPlaceholder } from '@/pages/DashboardPlaceholder'

function App() {
  return (
    <>
      <GlobalLoader />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <PublicOnlyRoute>
                <AuthPageTransition />
              </PublicOnlyRoute>
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="add-inventory" element={<DashboardPlaceholder title="Add Inventory" />} />
            <Route path="inventory-list" element={<DashboardPlaceholder title="Inventory List" />} />
            <Route path="stock-verification" element={<DashboardPlaceholder title="Stock Verification" />} />
            <Route path="design-label" element={<DashboardPlaceholder title="Design Label" />} />
            <Route path="create-prn-label" element={<DashboardPlaceholder title="Create PRN Label" />} />
            <Route path="quotation" element={<DashboardPlaceholder title="Quotation" />} />
            <Route path="invoice" element={<DashboardPlaceholder title="Invoice" />} />
            <Route path="sample-in" element={<DashboardPlaceholder title="Sample In" />} />
            <Route path="sample-out" element={<DashboardPlaceholder title="Sample Out" />} />
            <Route path="stock-transfer" element={<DashboardPlaceholder title="Stock Transfer" />} />
            <Route path="order-list" element={<DashboardPlaceholder title="Order List" />} />
            <Route path="reports" element={<DashboardPlaceholder title="Reports" />} />
            <Route path="scan-to-desktop" element={<DashboardPlaceholder title="Scan to Desktop" />} />
            <Route path="rfid-tags-sheet-upload" element={<DashboardPlaceholder title="RFID Tags Sheet Upload" />} />
            <Route path="rfid-tag-list" element={<DashboardPlaceholder title="RFID Tag List" />} />
            <Route path="rfid-tags-usage" element={<DashboardPlaceholder title="RFID Tags Usage" />} />
            <Route path="rfid-api-hub" element={<DashboardPlaceholder title="RFID API Hub" />} />
            <Route path="api-integration-guide" element={<DashboardPlaceholder title="API Integration Guide" />} />
            <Route path="quick-integration" element={<DashboardPlaceholder title="Quick Integration" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
