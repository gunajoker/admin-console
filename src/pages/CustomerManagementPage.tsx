import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  CustomerCard,
  type CustomerRecord,
} from "../components/dashboard/CustomerCard";
import { DashboardPageHeader } from "../components/dashboard/DashboardPageHeader";
import {
  DashboardSidebar,
  type DashboardSection,
} from "../components/dashboard/DashboardSidebar";
import { clearAuthToken } from "../features/auth/authSlice";
import {
  useGetAdminCustomersQuery,
  type CustomerApiItem,
} from "../services/adminApi";

type CustomerFilter = "all" | "active" | "blocked" | "deleted";
type CustomerProfileFilter = "all" | "complete" | "incomplete";

type CustomerManagementPageProps = {
  onNavigate: (section: DashboardSection) => void;
};

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatStatusLabel(status?: string) {
  if (!status) {
    return "Unknown";
  }

  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

function formatPreferenceLabel(value?: string) {
  if (!value) {
    return "Not specified";
  }

  return `Prefers ${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()} Stylist`;
}

function getCustomerProfileCategory(customer: CustomerApiItem) {
  return customer.system?.isProfileComplete
    ? "Complete Profile"
    : "Incomplete Profile";
}

function getCustomerStatus(customer: CustomerApiItem) {
  if (typeof customer.status === "string") {
    return customer.status;
  }

  if (customer.status?.deletedAt) {
    return "deleted";
  }

  if (customer.status?.blocked) {
    return "blocked";
  }

  if (customer.status?.active) {
    return "active";
  }

  return customer.system?.isProfileComplete ? "active" : "inactive";
}

function getCustomerName(customer: CustomerApiItem) {
  return (
    customer.profile?.fullName ||
    customer.name ||
    customer.fullName ||
    "Unnamed User"
  );
}

function getCustomerCode(customer: CustomerApiItem) {
  return customer.customerId || customer.userId || customer._id;
}

function getCustomerPhone(customer: CustomerApiItem) {
  if (customer.auth?.phone) {
    return customer.auth.phone;
  }

  if (customer.phone) {
    return customer.phone;
  }

  if (customer.number !== undefined && customer.number !== null) {
    return String(customer.number);
  }

  return "-";
}

function getCustomerLocation(customer: CustomerApiItem) {
  const city = customer.address?.city || customer.city;
  const state = customer.address?.state || customer.state;

  if (city && state) {
    return `${city}, ${state}`;
  }

  return city || state || undefined;
}

function mapCustomerToCardRecord(customer: CustomerApiItem): CustomerRecord {
  const derivedStatus = getCustomerStatus(customer);

  return {
    id: customer._id,
    name: getCustomerName(customer),
    userCode: getCustomerCode(customer),
    phone: getCustomerPhone(customer),
    email: customer.auth?.email || customer.email || undefined,
    location: getCustomerLocation(customer),
    gender: customer.profile?.gender || customer.gender || "Not specified",
    stylistPreference: formatPreferenceLabel(
      customer.preferences?.preferredStylistGender ||
        customer.preferredStylist ||
        customer.stylistPreference,
    ),
    status: formatStatusLabel(derivedStatus),
    profileCategory: getCustomerProfileCategory(customer),
    createdAt: formatDate(customer.system?.createdAt || customer.createdAt),
    updatedAt: formatDate(customer.system?.updatedAt || customer.updatedAt),
  };
}

export function CustomerManagementPage({
  onNavigate,
}: CustomerManagementPageProps) {
  const dispatch = useAppDispatch();
  const profileName =
    useAppSelector((state) => state.auth.profileName) ?? "Admin";
  const profileSecondaryText = "admin@salon.com";
  const [selectedFilter, setSelectedFilter] = useState<CustomerFilter>("all");
  const [selectedProfileFilter, setSelectedProfileFilter] =
    useState<CustomerProfileFilter>("all");
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const allCustomersQuery = useGetAdminCustomersQuery({
    page: 1,
    limit: 100,
  });
  const customersQuery = useGetAdminCustomersQuery({
    page: 1,
    limit: 10,
    status: selectedFilter === "all" ? undefined : selectedFilter,
    search: appliedSearch.trim() || undefined,
  });

  const counts = useMemo(() => {
    const allCustomers = allCustomersQuery.data?.customers ?? [];

    return {
      total: allCustomers.length,
      active: allCustomers.filter(
        (customer) => getCustomerStatus(customer) === "active",
      ).length,
      blocked: allCustomers.filter(
        (customer) => getCustomerStatus(customer) === "blocked",
      ).length,
      deleted: allCustomers.filter(
        (customer) => getCustomerStatus(customer) === "deleted",
      ).length,
      complete: allCustomers.filter(
        (customer) => customer.system?.isProfileComplete,
      ).length,
      incomplete: allCustomers.filter(
        (customer) => !customer.system?.isProfileComplete,
      ).length,
    };
  }, [allCustomersQuery.data?.customers]);

  const customers = useMemo(() => {
    const mappedCustomers = (customersQuery.data?.customers ?? []).map(
      mapCustomerToCardRecord,
    );

    if (selectedProfileFilter === "complete") {
      return mappedCustomers.filter(
        (customer) => customer.profileCategory === "Complete Profile",
      );
    }

    if (selectedProfileFilter === "incomplete") {
      return mappedCustomers.filter(
        (customer) => customer.profileCategory === "Incomplete Profile",
      );
    }

    return mappedCustomers;
  }, [customersQuery.data?.customers, selectedProfileFilter]);

  return (
    <main className="dashboard-shell" data-node-id="7:589">
      <DashboardSidebar activeSection="customers" onNavigate={onNavigate} />

      <section className="dashboard-content">
        <DashboardPageHeader
          title="Customer Management"
          description="View and manage customer accounts"
          profileName={profileName}
          profileSecondaryText={profileSecondaryText}
          onChangePassword={() => {}}
          onLogout={() => dispatch(clearAuthToken())}
        />

        <section className="customer-panel">
          <div className="customer-panel-toolbar">
            <div className="customer-filter-groups">
              <div
                className="tab-row"
                role="tablist"
                aria-label="Customer status filters"
              >
                <button
                  className={`tab-button ${selectedFilter === "all" ? "tab-button-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={selectedFilter === "all"}
                  onClick={() => setSelectedFilter("all")}
                >
                  All Customers ({counts.total})
                </button>
                <button
                  className={`tab-button ${selectedFilter === "active" ? "tab-button-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={selectedFilter === "active"}
                  onClick={() => setSelectedFilter("active")}
                >
                  Active ({counts.active})
                </button>
                <button
                  className={`tab-button ${selectedFilter === "blocked" ? "tab-button-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={selectedFilter === "blocked"}
                  onClick={() => setSelectedFilter("blocked")}
                >
                  Blocked ({counts.blocked})
                </button>
                <button
                  className={`tab-button ${selectedFilter === "deleted" ? "tab-button-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={selectedFilter === "deleted"}
                  onClick={() => setSelectedFilter("deleted")}
                >
                  Deleted ({counts.deleted})
                </button>
              </div>

              <div
                className="tab-row"
                role="tablist"
                aria-label="Customer profile completion filters"
              >
                <button
                  className={`tab-button ${selectedProfileFilter === "all" ? "tab-button-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={selectedProfileFilter === "all"}
                  onClick={() => setSelectedProfileFilter("all")}
                >
                  All Profiles ({counts.total})
                </button>
                <button
                  className={`tab-button ${selectedProfileFilter === "complete" ? "tab-button-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={selectedProfileFilter === "complete"}
                  onClick={() => setSelectedProfileFilter("complete")}
                >
                  Complete Profile ({counts.complete})
                </button>
                <button
                  className={`tab-button ${selectedProfileFilter === "incomplete" ? "tab-button-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={selectedProfileFilter === "incomplete"}
                  onClick={() => setSelectedProfileFilter("incomplete")}
                >
                  Incomplete Profile ({counts.incomplete})
                </button>
              </div>
            </div>

            <form
              className="customer-search-wrap"
              onSubmit={(event) => {
                event.preventDefault();
                setAppliedSearch(searchInput);
              }}
            >
              <input
                type="search"
                className="customer-search-input"
                placeholder="Search by customer name, email, or number"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                aria-label="Search customers by name, number, email, or code"
              />
              <button type="submit" className="customer-search-button">
                Search
              </button>
            </form>
          </div>

          <div className="customer-list">
            {customersQuery.isLoading ? (
              <div className="salon-panel-state">Loading customers...</div>
            ) : null}
            {customersQuery.isError ? (
              <div className="salon-panel-state salon-panel-state-error">
                Unable to load customers.
              </div>
            ) : null}
            {!customersQuery.isLoading &&
            !customersQuery.isError &&
            customers.length === 0 ? (
              <div className="salon-panel-state">No customers found.</div>
            ) : (
              !customersQuery.isLoading &&
              !customersQuery.isError &&
              customers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} />
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
