import { ClockIcon, BriefcaseIcon } from "../icons/DashboardIcons";

export type ServiceRecord = {
  name: string;
  category: string;
  description: string;
  duration: string;
  price: string;
  gender: string;
  isAddon: boolean;
  status: "Active" | "Inactive";
};

type ServiceCardProps = {
  service: ServiceRecord;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="stylist-card">
      <div className="stylist-body">
        <div className="stylist-heading">
          <h3 className="stylist-name">{service.name}</h3>
          <span
            className={`status-pill ${service.status === "Active" ? "status-pill-active" : "status-pill-inactive"}`}
          >
            {service.status}
          </span>
        </div>

        <div className="stylist-stats">
          <div className="stylist-stat">
            <BriefcaseIcon className="stylist-stat-icon" />
            <span>{service.category}</span>
          </div>
          <div className="stylist-stat">
            <ClockIcon className="stylist-stat-icon" />
            <span>{service.duration}</span>
          </div>
        </div>

        <div className="stylist-details">
          <div className="stylist-detail-row">
            <span className="stylist-detail-label">Description</span>
            <span className="stylist-detail-value">{service.description}</span>
          </div>
          <div className="stylist-detail-row">
            <span className="stylist-detail-label">Price</span>
            <span className="stylist-detail-value">{service.price}</span>
          </div>
          <div className="stylist-detail-row">
            <span className="stylist-detail-label">Gender</span>
            <span className="stylist-detail-value">{service.gender}</span>
          </div>
          {service.isAddon && (
            <div className="stylist-detail-row">
              <span className="stylist-detail-label">Type</span>
              <span className="stylist-detail-value">Add-on service</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
