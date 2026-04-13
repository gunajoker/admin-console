import { useEffect, useState } from "react";
import { useAppSelector } from "./app/hooks";
import { type DashboardSection } from "./components/dashboard/DashboardSidebar";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { CustomerManagementPage } from "./pages/CustomerManagementPage";
import { SalonManagementPage } from "./pages/SalonManagementPage";

function App() {
  const authToken = useAppSelector((state) => state.auth.token);
  const [activeSection, setActiveSection] =
    useState<DashboardSection>("salons");

  useEffect(() => {
    if (!authToken) {
      setActiveSection("salons");
    }
  }, [authToken]);

  if (!authToken) {
    return <AdminLoginPage />;
  }

  return activeSection === "salons" ? (
    <SalonManagementPage onNavigate={setActiveSection} />
  ) : (
    <CustomerManagementPage onNavigate={setActiveSection} />
  );
}

export default App;
