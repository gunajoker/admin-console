import { useDeferredValue, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { DashboardPageHeader } from "../components/dashboard/DashboardPageHeader";
import {
  DashboardSidebar,
  type DashboardSection,
} from "../components/dashboard/DashboardSidebar";
import { SalonCard, type SalonRecord } from "../components/dashboard/SalonCard";
import { clearAuthToken } from "../features/auth/authSlice";
import {
  useGetAdminSalonsQuery,
  type SalonApiItem,
} from "../services/adminApi";

type SalonFilter = "all" | "active" | "incomplete";
type SalonManagementPageProps = {
  onNavigate: (section: DashboardSection) => void;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getLocationLabel(salon: SalonApiItem) {
  const city = salon.address?.city;
  const state = salon.address?.state;

  if (city && state) {
    return `${city}, ${state}`;
  }

  return city ?? state ?? undefined;
}

function getHoursLabel(salon: SalonApiItem) {
  const mondayHours = salon.businessHours?.mon;

  if (mondayHours?.open && mondayHours.close) {
    return `${mondayHours.open} - ${mondayHours.close}`;
  }

  return undefined;
}

function mapSalonToCardRecord(salon: SalonApiItem): SalonRecord {
  const hasImages = Boolean(salon.images?.length);
  const isActive = salon.status === "active";

  return {
    name: salon.salonName,
    code: salon.salonId,
    phone: salon.contactNumber,
    createdAt: formatDate(salon.createdAt),
    updatedAt: formatDate(salon.updatedAt),
    status: isActive ? "Complete" : "Incomplete",
    imageUrl: salon.images?.[0],
    location: getLocationLabel(salon),
    hours: getHoursLabel(salon),
    imageCount: `${salon.images?.length ?? 0} image(s)`,
    useImageCard: hasImages,
  };
}

export function SalonManagementPage({ onNavigate }: SalonManagementPageProps) {
  const dispatch = useAppDispatch();
  const profileName =
    useAppSelector((state) => state.auth.profileName) ?? "Admin";
  const profileSecondaryText = "admin@salon.com";
  const [selectedFilter, setSelectedFilter] = useState<SalonFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm.trim());

  const allSalonsQuery = useGetAdminSalonsQuery({
    page: 1,
    limit: 10,
    search: deferredSearchTerm || undefined,
  });

  const activeSalonsQuery = useGetAdminSalonsQuery(
    {
      page: 1,
      limit: 10,
      status: "active",
      search: deferredSearchTerm || undefined,
    },
    {
      skip: selectedFilter !== "active",
    },
  );

  const salons = useMemo(() => {
    if (selectedFilter === "active") {
      return (activeSalonsQuery.data?.salons ?? []).map(mapSalonToCardRecord);
    }

    const allSalons = allSalonsQuery.data?.salons ?? [];

    if (selectedFilter === "incomplete") {
      return allSalons
        .filter((salon) => salon.status !== "active")
        .map(mapSalonToCardRecord);
    }

    return allSalons.map(mapSalonToCardRecord);
  }, [
    activeSalonsQuery.data?.salons,
    allSalonsQuery.data?.salons,
    selectedFilter,
  ]);

  const counts = allSalonsQuery.data?.counts;
  const isLoading =
    selectedFilter === "active"
      ? activeSalonsQuery.isLoading
      : allSalonsQuery.isLoading;
  const isError =
    selectedFilter === "active"
      ? activeSalonsQuery.isError
      : allSalonsQuery.isError;

  return (
    <main className="dashboard-shell" data-node-id="2:2">
      <DashboardSidebar activeSection="salons" onNavigate={onNavigate} />

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
          <div className="salon-panel-toolbar">
            <div
              className="tab-row"
              data-node-id="2:34"
              role="tablist"
              aria-label="Salon filters"
            >
              <button
                className={`tab-button ${selectedFilter === "all" ? "tab-button-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={selectedFilter === "all"}
                onClick={() => setSelectedFilter("all")}
              >
                All Salons ({counts?.total ?? 0})
              </button>
              <button
                className={`tab-button ${selectedFilter === "active" ? "tab-button-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={selectedFilter === "active"}
                onClick={() => setSelectedFilter("active")}
              >
                Active ({counts?.active ?? 0})
              </button>
              <button
                className={`tab-button ${selectedFilter === "incomplete" ? "tab-button-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={selectedFilter === "incomplete"}
                onClick={() => setSelectedFilter("incomplete")}
              >
                Incomplete Signup ({counts?.other ?? 0})
              </button>
            </div>

            <div className="salon-search-wrap">
              <input
                type="search"
                className="salon-search-input"
                placeholder="Search by salon name or number"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search salons by name or number"
              />
            </div>
          </div>

          <div className="salon-list">
            {isLoading ? (
              <div className="salon-panel-state">Loading salons...</div>
            ) : null}
            {isError ? (
              <div className="salon-panel-state salon-panel-state-error">
                Unable to load salons.
              </div>
            ) : null}
            {!isLoading && !isError && salons.length === 0 ? (
              <div className="salon-panel-state">No salons found.</div>
            ) : null}
            {!isLoading && !isError
              ? salons.map((salon) => (
                  <SalonCard key={salon.code} salon={salon} />
                ))
              : null}
          </div>
        </section>
      </section>
    </main>
  );
}
