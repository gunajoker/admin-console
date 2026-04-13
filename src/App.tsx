import { useState } from "react";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { SalonManagementPage } from "./pages/SalonManagementPage";

type AppScreen = "login" | "salon-management";

function App() {
  const [screen, setScreen] = useState<AppScreen>("login");

  return screen === "login" ? (
    <AdminLoginPage onSignIn={() => setScreen("salon-management")} />
  ) : (
    <SalonManagementPage />
  );
}

export default App;
