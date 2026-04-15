import {
  BuildingIcon,
  CaretDownIcon,
  ClockIcon,
  GalleryIcon,
  IdIcon,
  LocationIcon,
  PhoneIcon,
} from "../icons/DashboardIcons";

export type SalonStatus = "Complete" | "Incomplete";

export type SalonRecord = {
  name: string;
  code: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  status: SalonStatus;
  imageUrl?: string;
  location?: string;
  hours?: string;
  imageCount?: string;
  useImageCard?: boolean;
};

type SalonCardProps = {
  salon: SalonRecord;
  onClick?: () => void;
};

export function SalonCard({ salon, onClick }: SalonCardProps) {
  const isComplete = salon.status === "Complete";

  return (
    <article
      className="salon-row"
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    >
      <div
        className={`salon-media ${salon.useImageCard ? "salon-media-image" : "salon-media-placeholder"}`}
      >
        {salon.useImageCard && salon.imageUrl ? (
          <img className="salon-cover" src={salon.imageUrl} alt={salon.name} />
        ) : salon.useImageCard ? (
          <div className="salon-cover-placeholder" aria-label={salon.name}>
            <span>{salon.name}</span>
          </div>
        ) : (
          <BuildingIcon className="salon-placeholder-icon" />
        )}
      </div>

      <div className="salon-main">
        <div className="salon-heading-row">
          <div className="salon-title-wrap">
            <h3>{salon.name}</h3>
            <span
              className={`status-pill ${isComplete ? "status-pill-complete" : "status-pill-incomplete"}`}
            >
              {salon.status}
            </span>
          </div>

          <button
            className={`status-dropdown ${isComplete ? "status-dropdown-complete" : "status-dropdown-incomplete"}`}
            type="button"
            aria-label={`Change status for ${salon.name}`}
          >
            <span>{isComplete ? "Approved" : "Review pending"}</span>
            <CaretDownIcon />
          </button>
        </div>

        <div className="salon-meta-grid">
          <div className="meta-item">
            <IdIcon />
            <span>{salon.code}</span>
          </div>
          <div className="meta-item">
            <PhoneIcon />
            <span>{salon.phone}</span>
          </div>
          {salon.location ? (
            <div className="meta-item">
              <LocationIcon />
              <span>{salon.location}</span>
            </div>
          ) : null}
          {salon.hours ? (
            <div className="meta-item">
              <ClockIcon />
              <span>{salon.hours}</span>
            </div>
          ) : null}
          {salon.imageCount ? (
            <div className="meta-item">
              <GalleryIcon />
              <span>{salon.imageCount}</span>
            </div>
          ) : null}
        </div>

        <p className="salon-timestamp">
          Created: {salon.createdAt} • Updated: {salon.updatedAt}
        </p>
      </div>
    </article>
  );
}
