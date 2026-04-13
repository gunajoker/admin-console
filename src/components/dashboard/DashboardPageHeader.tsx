import { useEffect, useRef, useState } from "react";
import { CaretDownIcon, UserCircleIcon } from "../icons/DashboardIcons";

type DashboardPageHeaderProps = {
  title: string;
  description: string;
  profileName: string;
  profileSecondaryText?: string | null;
  onLogout: () => void;
  onChangePassword?: () => void;
};

export function DashboardPageHeader({
  title,
  description,
  profileName,
  profileSecondaryText,
  onLogout,
  onChangePassword,
}: DashboardPageHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="page-header" data-node-id="2:27">
      <div className="page-header-copy">
        <h2 data-node-id="2:30">{title}</h2>
        <p data-node-id="2:32">{description}</p>
      </div>

      <div className="page-header-actions">
        <div className="profile-menu" ref={menuRef}>
          <button
            type="button"
            className="profile-trigger"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-label="Open profile menu"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <UserCircleIcon className="profile-avatar-icon" />
            <div className="profile-meta">
              <span className="profile-name">{profileName}</span>
              {profileSecondaryText ? (
                <span className="profile-secondary">
                  {profileSecondaryText}
                </span>
              ) : null}
            </div>
            <CaretDownIcon
              className={`profile-chevron ${isMenuOpen ? "profile-chevron-open" : ""}`}
            />
          </button>

          {isMenuOpen ? (
            <div
              className="profile-dropdown"
              role="menu"
              aria-label="Profile actions"
            >
              <button
                type="button"
                className="profile-menu-item"
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false);
                  onChangePassword?.();
                }}
              >
                Change Password
              </button>
              <button
                type="button"
                className="profile-menu-item profile-menu-item-danger"
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false);
                  onLogout();
                }}
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
