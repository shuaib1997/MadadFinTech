import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LenderCalculator from './pages/LenderCalculator.jsx';
import MsmePortal from './pages/MsmePortal.jsx'
import LenderPortal from './pages/LenderPortel.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<LenderCalculator />} />
        <Route path="/msme" element={<MsmePortal />} />
        <Route path="/lender" element={<LenderPortal />} />
      </Routes>
    </BrowserRouter>
  )
}
