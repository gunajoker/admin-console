import {
  BriefcaseIcon,
  ClockIcon,
  StarIcon,
  UserCircleIcon,
} from "../icons/DashboardIcons";

export type StylistRecord = {
  name: string;
  status: "Active" | "Inactive";
  experience: string;
  rating: string;
  reviewCount: number;
  workingHours: string;
  specialization: string;
  workingDays: string;
};

type StylistCardProps = {
  stylist: StylistRecord;
};

export function StylistCard({ stylist }: StylistCardProps) {
  return (
    <article className="stylist-card">
      <div className="stylist-avatar">
        <UserCircleIcon className="stylist-avatar-icon" />
      </div>

      <div className="stylist-info">
        <div className="stylist-heading-row">
          <h3 className="stylist-name">{stylist.name}</h3>
          <span
            className={`status-pill ${stylist.status === "Active" ? "status-pill-active" : "status-pill-inactive"}`}
          >
            {stylist.status}
          </span>
        </div>

        <div className="stylist-meta-row">
          <div className="stylist-meta-item">
            <BriefcaseIcon className="stylist-meta-icon" />
            <span>{stylist.experience}</span>
          </div>
          <div className="stylist-meta-item">
            <StarIcon className="stylist-meta-icon" />
            <span>
              {stylist.rating} ({stylist.reviewCount} reviews)
            </span>
          </div>
          <div className="stylist-meta-item">
            <ClockIcon className="stylist-meta-icon" />
            <span>{stylist.workingHours}</span>
          </div>
        </div>

        <p className="stylist-detail">
          <span className="stylist-detail-label">Specialization:</span>{" "}
          {stylist.specialization}
        </p>
        <p className="stylist-detail">
          <span className="stylist-detail-label">Working days:</span>{" "}
          {stylist.workingDays}
        </p>
      </div>
    </article>
  );
}
