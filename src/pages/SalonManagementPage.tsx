import { useAppDispatch, useAppSelector } from "../app/hooks";
import { DashboardPageHeader } from "../components/dashboard/DashboardPageHeader";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import { SalonCard, type SalonRecord } from "../components/dashboard/SalonCard";
import { clearAuthToken } from "../features/auth/authSlice";

const salons: SalonRecord[] = [
  {
    name: "Guna Salon",
    code: "salon_sal_0003",
    phone: "9159132746",
    createdAt: "11 Apr 2026",
    updatedAt: "12 Apr 2026",
    status: "Complete",
    location: "Coimbatore, Tamil Nadu",
    hours: "09:00 - 18:00",
    imageCount: "1 image(s)",
    useImageCard: true,
  },
  {
    name: "Style Studio",
    code: "salon_sal_0004",
    phone: "9876543211",
    createdAt: "10 Apr 2026",
    updatedAt: "11 Apr 2026",
    status: "Complete",
    location: "Chennai, Tamil Nadu",
    hours: "10:00 - 20:00",
    imageCount: "1 image(s)",
    useImageCard: true,
  },
  {
    name: "Salon",
    code: "salon_sal_0008",
    phone: "8300821710",
    createdAt: "13 Apr 2026",
    updatedAt: "13 Apr 2026",
    status: "Incomplete",
  },
  {
    name: "Beauty Corner",
    code: "salon_sal_0009",
    phone: "9876543210",
    createdAt: "12 Apr 2026",
    updatedAt: "12 Apr 2026",
    status: "Incomplete",
  },
];

export function SalonManagementPage() {
  const dispatch = useAppDispatch();
  const profileName =
    useAppSelector((state) => state.auth.profileName) ?? "Admin";
  const profileSecondaryText = "admin@salon.com";

  return (
    <main className="dashboard-shell" data-node-id="2:2">
      <DashboardSidebar />

      <section className="dashboard-content" data-node-id="2:26">
        <DashboardPageHeader
          title="Salon Management"
          description="Manage salon registrations and profiles"
          profileName={profileName}
          profileSecondaryText={profileSecondaryText}
          onChangePassword={() => {}}
          onLogout={() => dispatch(clearAuthToken())}
        />

        <section className="salon-panel" data-node-id="2:33">
          <div
            className="tab-row"
            data-node-id="2:34"
            role="tablist"
            aria-label="Salon filters"
          >
            <button
              className="tab-button tab-button-active"
              type="button"
              role="tab"
              aria-selected="true"
            >
              All Salons (4)
            </button>
            <button
              className="tab-button"
              type="button"
              role="tab"
              aria-selected="false"
            >
              Active (2)
            </button>
            <button
              className="tab-button"
              type="button"
              role="tab"
              aria-selected="false"
            >
              Incomplete Signup (2)
            </button>
          </div>

          <div className="salon-list">
            {salons.map((salon) => (
              <SalonCard key={salon.code} salon={salon} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
