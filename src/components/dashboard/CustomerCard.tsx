import {
  GenderIcon,
  IdIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  PreferenceIcon,
} from "../icons/DashboardIcons";

export type CustomerProfileStatus = "Complete" | "Incomplete";

export type CustomerRecord = {
  id: string;
  name: string;
  userCode: string;
  phone: string;
  gender: string;
  stylistPreference: string;
  status: string;
  profileCategory: string;
  createdAt: string;
  updatedAt: string;
  email?: string;
  location?: string;
};

type CustomerCardProps = {
  customer: CustomerRecord;
};

export function CustomerCard({ customer }: CustomerCardProps) {
  const normalizedStatus = customer.status.toLowerCase();
  const statusClassName =
    normalizedStatus === "active"
      ? "status-dropdown status-dropdown-active"
      : normalizedStatus === "blocked"
        ? "status-dropdown status-dropdown-blocked"
        : normalizedStatus === "deleted"
          ? "status-dropdown status-dropdown-deleted"
          : normalizedStatus === "complete"
            ? "status-dropdown status-dropdown-complete"
            : "status-dropdown status-dropdown-incomplete";

  return (
    <article className="customer-row">
      <div className="customer-heading-row">
        <div className="customer-title-wrap">
          <h3>{customer.name}</h3>
          <span className={statusClassName}>{customer.status}</span>
          <span
            className={
              customer.profileCategory === "Complete Profile"
                ? "status-dropdown status-dropdown-complete"
                : "status-dropdown status-dropdown-incomplete"
            }
          >
            {customer.profileCategory}
          </span>
        </div>
      </div>

      <div className="customer-meta-grid">
        <div className="meta-item">
          <IdIcon />
          <span>{customer.userCode}</span>
        </div>
        <div className="meta-item">
          <PhoneIcon />
          <span>{customer.phone}</span>
        </div>
        {customer.email ? (
          <div className="meta-item">
            <MailIcon />
            <span>{customer.email}</span>
          </div>
        ) : null}
        {customer.location ? (
          <div className="meta-item">
            <LocationIcon />
            <span>{customer.location}</span>
          </div>
        ) : null}
        <div className="meta-item">
          <GenderIcon />
          <span>{customer.gender}</span>
        </div>
        <div className="meta-item">
          <PreferenceIcon />
          <span>{customer.stylistPreference}</span>
        </div>
      </div>

      <p className="customer-timestamp">
        Created: {customer.createdAt} • Updated: {customer.updatedAt}
      </p>
    </article>
  );
}
