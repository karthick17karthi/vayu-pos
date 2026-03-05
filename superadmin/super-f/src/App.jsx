import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import ClientOnboarding from './pages/ClientOnboarding';
import UserAccessPage from './pages/UserAccessPage';
import PaymentPage from './pages/PaymentPage';
import OfferPage from './pages/OfferPage';
import ReportsPage from './pages/ReportsPage';
import LeadsPage from './pages/LeadsPage';
import SuperAdminLanding from './pages/SuperAdminLanding';
import { useTheme } from './context/ThemeContext.jsx';
import { getThemeConfig } from './theme/designSystem.js';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);

  return (
    <Provider store={store}>
      <Router>
        <div className={`h-screen flex flex-col ${themeConfig.colors['bg-primary']} transition-theme duration-theme ease-theme`}>
          {/* Navbar */}
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main layout with Sidebar and Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Page Content */}
            <main className="flex-1 overflow-auto transition-theme duration-theme ease-theme">
              <div className="p-4 md:p-8">
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/client-onboarding" element={<ClientOnboarding />} />
                  <Route path="/user-access" element={<UserAccessPage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/offers" element={<OfferPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/leads" element={<LeadsPage />} />
                  <Route path="/landing-cms" element={<SuperAdminLanding />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </Provider>
  );
}
