import { useAppSelector } from './app/hooks';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { SalonManagementPage } from './pages/SalonManagementPage';

type AppScreen = "login" | "salon-management";

function App() {
  const authToken = useAppSelector((state) => state.auth.token);
  const screen: AppScreen = authToken ? "salon-management" : "login";

  return screen === "login" ? (
    <AdminLoginPage />
  ) : (
    <SalonManagementPage />
  );
}

export default App;
