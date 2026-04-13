import zulopeIcon from "../../assets/zulope-icon.png";
import { CustomersNavIcon, SalonNavIcon } from "../icons/DashboardIcons";

export type DashboardSection = "salons" | "customers";

type DashboardSidebarProps = {
  activeSection: DashboardSection;
  onNavigate: (section: DashboardSection) => void;
};

export function DashboardSidebar({
  activeSection,
  onNavigate,
}: DashboardSidebarProps) {
  return (
    <aside className="dashboard-sidebar" data-node-id="2:3">
      <div className="sidebar-brand">
        <img
          className="sidebar-brand-icon"
          src={zulopeIcon}
          alt="zulope logo"
        />
        <div>
          <p className="sidebar-brand-name">zulope</p>
          <h1 className="sidebar-brand-title" data-node-id="2:5">
            Admin Panel
          </h1>
        </div>
      </div>

      <nav
        className="sidebar-nav"
        data-node-id="2:6"
        aria-label="Primary navigation"
      >
        <button
          className={`sidebar-link ${activeSection === "salons" ? "sidebar-link-active" : ""}`}
          type="button"
          data-node-id="2:7"
          aria-current={activeSection === "salons" ? "page" : undefined}
          onClick={() => onNavigate("salons")}
        >
          <SalonNavIcon />
          <span>Salons</span>
        </button>
        <button
          className={`sidebar-link ${activeSection === "customers" ? "sidebar-link-active" : ""}`}
          type="button"
          data-node-id="2:18"
          aria-current={activeSection === "customers" ? "page" : undefined}
          onClick={() => onNavigate("customers")}
        >
          <CustomersNavIcon />
          <span>Customers</span>
        </button>
      </nav>
    </aside>
  );
}
