import zulopeIcon from "../../assets/zulope-icon.png";
import { CustomersNavIcon, SalonNavIcon } from "../icons/DashboardIcons";

export function DashboardSidebar() {
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
          className="sidebar-link sidebar-link-active"
          type="button"
          data-node-id="2:7"
        >
          <SalonNavIcon />
          <span>Salons</span>
        </button>
        <button className="sidebar-link" type="button" data-node-id="2:18">
          <CustomersNavIcon />
          <span>Customers</span>
        </button>
      </nav>
    </aside>
  );
}
