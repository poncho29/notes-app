import { Routes, Route, Navigate } from "react-router-dom"

import { AuthProvider } from "./context/auth"

import { Login, Register, Dashboard } from "./pages"

import { ProtectedRoute } from "./components"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
