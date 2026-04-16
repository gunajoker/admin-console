import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { DashboardPageHeader } from "../components/dashboard/DashboardPageHeader";
import {
  DashboardSidebar,
  type DashboardSection,
} from "../components/dashboard/DashboardSidebar";
import {
  ServiceCard,
  type ServiceRecord,
} from "../components/dashboard/ServiceCard";
import {
  StylistCard,
  type StylistRecord,
} from "../components/dashboard/StylistCard";
import { ArrowLeftIcon } from "../components/icons/DashboardIcons";
import { clearAuthToken } from "../features/auth/authSlice";
import {
  useGetSalonServicesQuery,
  useGetSalonStylistsQuery,
  type SalonApiItem,
  type ServiceApiItem,
  type StylistApiItem,
} from "../services/adminApi";

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

function mapStylistToRecord(stylist: StylistApiItem): StylistRecord {
  const hours = stylist.workingHours;
  const hoursLabel =
    hours?.start && hours?.end ? `${hours.start} - ${hours.end}` : "";

  return {
    name: stylist.name,
    status: stylist.isActive ? "Active" : "Inactive",
    experience: stylist.experienceYears
      ? `${stylist.experienceYears} years exp`
      : "N/A",
    rating: String(stylist.rating ?? 0),
    reviewCount: stylist.reviewsCount ?? 0,
    workingHours: hoursLabel,
    specialization: stylist.specialization?.join(", ") ?? "",
    workingDays: stylist.workingDays?.join(", ") ?? "",
    services: stylist.services?.map((s) => s.name).join(", ") ?? "",
    profilePic: stylist.profilePic || undefined,
  };
}

function mapServiceToRecord(service: ServiceApiItem): ServiceRecord {
  return {
    name: service.name,
    category: service.category,
    description: service.description || "No description",
    duration: `${service.durationMinutes} min`,
    price: `₹${service.price}`,
    gender: service.gender,
    isAddon: service.isAddon,
    status: service.isActive ? "Active" : "Inactive",
  };
}

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
  const stylistsQuery = useGetSalonStylistsQuery(salon._id);
  const stylists = (stylistsQuery.data?.stylists ?? []).map(mapStylistToRecord);
  const servicesQuery = useGetSalonServicesQuery(salon._id);
  const services = (servicesQuery.data?.services ?? []).map(mapServiceToRecord);
  const servicesByCategory = services.reduce<Record<string, ServiceRecord[]>>(
    (acc, service) => {
      const key = service.category || "Other";
      (acc[key] ??= []).push(service);
      return acc;
    },
    {},
  );

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
                {stylistsQuery.isLoading ? (
                  <div className="salon-panel-state">Loading stylists...</div>
                ) : stylistsQuery.isError ? (
                  <div className="salon-panel-state salon-panel-state-error">
                    Unable to load stylists.
                  </div>
                ) : stylists.length === 0 ? (
                  <div className="salon-panel-state">No stylists found.</div>
                ) : (
                  stylists.map((stylist) => (
                    <StylistCard key={stylist.name} stylist={stylist} />
                  ))
                )}
              </div>
            ) : activeTab === "services" ? (
              <div>
                {servicesQuery.isLoading ? (
                  <div className="salon-panel-state">Loading services...</div>
                ) : servicesQuery.isError ? (
                  <div className="salon-panel-state salon-panel-state-error">
                    Unable to load services.
                  </div>
                ) : services.length === 0 ? (
                  <div className="salon-panel-state">No services found.</div>
                ) : (
                  Object.entries(servicesByCategory).map(
                    ([category, items]) => (
                      <div key={category} className="service-category-group">
                        <h3 className="service-category-title">{category}</h3>
                        <div className="stylist-list">
                          {items.map((service) => (
                            <ServiceCard key={service.name} service={service} />
                          ))}
                        </div>
                      </div>
                    ),
                  )
                )}
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
