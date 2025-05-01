import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Component/Navbar.jsx';
import LenderCalculator from './pages/LenderCalculator.jsx';
import MsmePortal from './pages/MsmePortal.jsx';
import LenderPortal from './pages/LenderPortel.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-full">
        <Navbar />
        
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<LenderCalculator />} />
              <Route path="/msme" element={<MsmePortal />} />
              <Route path="/lender" element={<LenderPortal />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
