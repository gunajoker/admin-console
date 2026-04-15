import { useEffect, useState } from "react";
import { useAppSelector } from "./app/hooks";
import { type DashboardSection } from "./components/dashboard/DashboardSidebar";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { CustomerManagementPage } from "./pages/CustomerManagementPage";
import { SalonDetailPage } from "./pages/SalonDetailPage";
import { SalonManagementPage } from "./pages/SalonManagementPage";
import type { SalonApiItem } from "./services/adminApi";

function App() {
  const authToken = useAppSelector((state) => state.auth.token);
  const [activeSection, setActiveSection] =
    useState<DashboardSection>("salons");
  const [selectedSalon, setSelectedSalon] = useState<SalonApiItem | null>(null);

  useEffect(() => {
    if (!authToken) {
      setActiveSection("salons");
      setSelectedSalon(null);
    }
  }, [authToken]);

  if (!authToken) {
    return <AdminLoginPage />;
  }

  if (activeSection === "salons" && selectedSalon) {
    return (
      <SalonDetailPage
        salon={selectedSalon}
        onBack={() => setSelectedSalon(null)}
        onNavigate={(section) => {
          setSelectedSalon(null);
          setActiveSection(section);
        }}
      />
    );
  }

  return activeSection === "salons" ? (
    <SalonManagementPage
      onNavigate={setActiveSection}
      onSelectSalon={setSelectedSalon}
    />
  ) : (
    <CustomerManagementPage onNavigate={setActiveSection} />
  );
}

export default App;
