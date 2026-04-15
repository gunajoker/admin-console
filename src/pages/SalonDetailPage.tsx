import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { DashboardPageHeader } from "../components/dashboard/DashboardPageHeader";
import {
  DashboardSidebar,
  type DashboardSection,
} from "../components/dashboard/DashboardSidebar";
import {
  StylistCard,
  type StylistRecord,
} from "../components/dashboard/StylistCard";
import { ArrowLeftIcon } from "../components/icons/DashboardIcons";
import { clearAuthToken } from "../features/auth/authSlice";
import type { SalonApiItem } from "../services/adminApi";

type SalonDetailTab =
  | "stylists"
  | "services"
  | "advertisements"
  | "bookings"
  | "earnings"
  | "portfolio";

const TABS: { key: SalonDetailTab; label: string }[] = [
  { key: "stylists", label: "Stylists" },
  { key: "services", label: "Services" },
  { key: "advertisements", label: "Advertisements" },
  { key: "bookings", label: "Bookings" },
  { key: "earnings", label: "Earnings" },
  { key: "portfolio", label: "Portfolio" },
];

function getWorkingDaysLabel(
  businessHours?: SalonApiItem["businessHours"],
): string {
  if (!businessHours) return "";
  const dayOrder = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return dayOrder
    .filter((day) => {
      const h = businessHours[day];
      return h?.open && h?.close;
    })
    .join(", ");
}

function getWorkingHoursLabel(
  businessHours?: SalonApiItem["businessHours"],
): string {
  if (!businessHours) return "";
  const firstDay = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].find(
    (day) => {
      const h = businessHours[day];
      return h?.open && h?.close;
    },
  );
  if (!firstDay) return "";
  const h = businessHours[firstDay];
  return `${h?.open} - ${h?.close}`;
}

// Mock stylists until a real API endpoint exists
const MOCK_STYLISTS: StylistRecord[] = [
  {
    name: "Karnan A",
    status: "Active",
    experience: "5 years exp",
    rating: "0",
    reviewCount: 0,
    workingHours: "10:00 - 19:00",
    specialization: "Hair cut for men",
    workingDays: "mon, tue, wed, thu, fri",
  },
  {
    name: "Priya M",
    status: "Active",
    experience: "8 years exp",
    rating: "4.5",
    reviewCount: 23,
    workingHours: "09:00 - 18:00",
    specialization: "Hair cut for women, Hair coloring",
    workingDays: "mon, tue, wed, thu, fri, sat",
  },
];

type SalonDetailPageProps = {
  salon: SalonApiItem;
  onBack: () => void;
  onNavigate: (section: DashboardSection) => void;
};

export function SalonDetailPage({
  salon,
  onBack,
  onNavigate,
}: SalonDetailPageProps) {
  const dispatch = useAppDispatch();
  const profileName =
    useAppSelector((state) => state.auth.profileName) ?? "Admin";
  const [activeTab, setActiveTab] = useState<SalonDetailTab>("stylists");

  return (
    <main className="dashboard-shell">
      <DashboardSidebar activeSection="salons" onNavigate={onNavigate} />

      <section className="dashboard-content">
        <DashboardPageHeader
          title=""
          description=""
          profileName={profileName}
          profileSecondaryText="admin@salon.com"
          onChangePassword={() => {}}
          onLogout={() => dispatch(clearAuthToken())}
        />

        <div className="salon-detail-header">
          <button type="button" className="back-link" onClick={onBack}>
            <ArrowLeftIcon className="back-link-icon" />
            <span>Back to Salons</span>
          </button>
          <h1 className="salon-detail-title">{salon.salonName}</h1>
          <p className="salon-detail-id">{salon.salonId}</p>
        </div>

        <section className="salon-detail-panel">
          <div className="salon-detail-tabs">
            <div className="tab-row" role="tablist" aria-label="Salon details">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  className={`tab-button ${activeTab === tab.key ? "tab-button-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="salon-detail-tab-content">
            {activeTab === "stylists" ? (
              <div className="stylist-list">
                {MOCK_STYLISTS.map((stylist) => (
                  <StylistCard key={stylist.name} stylist={stylist} />
                ))}
              </div>
            ) : (
              <div className="salon-panel-state">
                No {activeTab} data available.
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
