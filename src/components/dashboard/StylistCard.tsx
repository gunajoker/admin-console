import { useState } from "react";
import { createPortal } from "react-dom";
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
  services: string;
  profilePic?: string;
};

type StylistCardProps = {
  stylist: StylistRecord;
};

export function StylistCard({ stylist }: StylistCardProps) {
  const [showLightbox, setShowLightbox] = useState(false);

  return (
    <article className="stylist-card">
      <div
        className="stylist-cover"
        onClick={stylist.profilePic ? () => setShowLightbox(true) : undefined}
        style={stylist.profilePic ? { cursor: "pointer" } : undefined}
      >
        {stylist.profilePic ? (
          <img
            className="stylist-cover-img"
            src={stylist.profilePic}
            alt={stylist.name}
          />
        ) : (
          <UserCircleIcon className="stylist-cover-icon" />
        )}
      </div>

      {showLightbox && stylist.profilePic
        ? createPortal(
            <div
              className="lightbox-overlay"
              onClick={() => setShowLightbox(false)}
            >
              <button
                type="button"
                className="lightbox-close"
                onClick={() => setShowLightbox(false)}
                aria-label="Close image"
              >
                &times;
              </button>
              <img
                className="lightbox-img"
                src={stylist.profilePic}
                alt={stylist.name}
                onClick={(e) => e.stopPropagation()}
              />
            </div>,
            document.body,
          )
        : null}

      <div className="stylist-body">
        <div className="stylist-heading">
          <h3 className="stylist-name">{stylist.name}</h3>
          <span
            className={`status-pill ${stylist.status === "Active" ? "status-pill-active" : "status-pill-inactive"}`}
          >
            {stylist.status}
          </span>
        </div>

        <div className="stylist-stats">
          <div className="stylist-stat">
            <BriefcaseIcon className="stylist-stat-icon" />
            <span>{stylist.experience}</span>
          </div>
          <div className="stylist-stat">
            <StarIcon className="stylist-stat-icon" />
            <span>
              {stylist.rating} ({stylist.reviewCount} reviews)
            </span>
          </div>
          <div className="stylist-stat">
            <ClockIcon className="stylist-stat-icon" />
            <span>{stylist.workingHours}</span>
          </div>
        </div>

        <div className="stylist-details">
          <div className="stylist-detail-row">
            <span className="stylist-detail-label">Specialization</span>
            <span className="stylist-detail-value">
              {stylist.specialization}
            </span>
          </div>
          <div className="stylist-detail-row">
            <span className="stylist-detail-label">Working days</span>
            <span className="stylist-detail-value">{stylist.workingDays}</span>
          </div>
          {stylist.services && (
            <div className="stylist-detail-row">
              <span className="stylist-detail-label">Services</span>
              <span className="stylist-detail-value">{stylist.services}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
