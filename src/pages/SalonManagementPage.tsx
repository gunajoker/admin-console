import zulopeIcon from "../assets/zulope-icon.png";

const sidebarSalonIcon =
  "http://localhost:3845/assets/67cc37e4b556976d43e857c2b97a39df72544123.svg";
const sidebarCustomerIcon =
  "http://localhost:3845/assets/3f13dd4e57bf448b92c2496aefc9a9dc0e52366b.svg";
const salonHeroImage =
  "http://localhost:3845/assets/9070e4fd0dd388c57b1c9f9f8f0e836b7e237d94.svg";
const buildingIcon =
  "http://localhost:3845/assets/a30ad84a3c594ee1cef84084f9a71084b9689edd.svg";
const caretIcon =
  "http://localhost:3845/assets/5378157d09ac5b1b5b250b0c99f0b584e74f4b3a.svg";
const idIcon =
  "http://localhost:3845/assets/1c6cea72caab2ba3ebebbf3b96d2370a8750c96e.svg";
const phoneIcon =
  "http://localhost:3845/assets/9733d519807157b1b8b089ebec0c8e577434fba1.svg";
const locationIcon =
  "http://localhost:3845/assets/71cb7f78ca999717deaf7dab2631ba34bde89758.svg";
const timeIcon =
  "http://localhost:3845/assets/03d9ae629e07be2ec182e0d5c37e72b0fb9dabbc.svg";
const galleryIcon =
  "http://localhost:3845/assets/1405673a7a5dc1437f93a9578064c57c93c4e1ac.svg";

type SalonStatus = "Complete" | "Incomplete";

type SalonRecord = {
  name: string;
  code: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  status: SalonStatus;
  location?: string;
  hours?: string;
  imageCount?: string;
  useImageCard?: boolean;
};

const salons: SalonRecord[] = [
  {
    name: "Guna Salon",
    code: "salon_sal_0003",
    phone: "9159132746",
    createdAt: "11 Apr 2026",
    updatedAt: "12 Apr 2026",
    status: "Complete",
    location: "Coimbatore, Tamil Nadu",
    hours: "09:00 - 18:00",
    imageCount: "1 image(s)",
    useImageCard: true,
  },
  {
    name: "Style Studio",
    code: "salon_sal_0004",
    phone: "9876543211",
    createdAt: "10 Apr 2026",
    updatedAt: "11 Apr 2026",
    status: "Complete",
    location: "Chennai, Tamil Nadu",
    hours: "10:00 - 20:00",
    imageCount: "1 image(s)",
    useImageCard: true,
  },
  {
    name: "Salon",
    code: "salon_sal_0008",
    phone: "8300821710",
    createdAt: "13 Apr 2026",
    updatedAt: "13 Apr 2026",
    status: "Incomplete",
  },
  {
    name: "Beauty Corner",
    code: "salon_sal_0009",
    phone: "9876543210",
    createdAt: "12 Apr 2026",
    updatedAt: "12 Apr 2026",
    status: "Incomplete",
  },
];

export function SalonManagementPage() {
  return (
    <main className="dashboard-shell" data-node-id="2:2">
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
            <img src={sidebarSalonIcon} alt="" aria-hidden="true" />
            <span>Salons</span>
          </button>
          <button className="sidebar-link" type="button" data-node-id="2:18">
            <img src={sidebarCustomerIcon} alt="" aria-hidden="true" />
            <span>Customers</span>
          </button>
        </nav>
      </aside>

      <section className="dashboard-content" data-node-id="2:26">
        <header className="page-header" data-node-id="2:27">
          <h2 data-node-id="2:30">Salon Management</h2>
          <p data-node-id="2:32">Manage salon registrations and profiles</p>
        </header>

        <section className="salon-panel" data-node-id="2:33">
          <div
            className="tab-row"
            data-node-id="2:34"
            role="tablist"
            aria-label="Salon filters"
          >
            <button
              className="tab-button tab-button-active"
              type="button"
              role="tab"
              aria-selected="true"
            >
              All Salons (4)
            </button>
            <button
              className="tab-button"
              type="button"
              role="tab"
              aria-selected="false"
            >
              Active (2)
            </button>
            <button
              className="tab-button"
              type="button"
              role="tab"
              aria-selected="false"
            >
              Incomplete Signup (2)
            </button>
          </div>

          <div className="salon-list">
            {salons.map((salon) => {
              const isComplete = salon.status === "Complete";

              return (
                <article className="salon-row" key={salon.code}>
                  <div
                    className={`salon-media ${salon.useImageCard ? "salon-media-image" : "salon-media-placeholder"}`}
                  >
                    {salon.useImageCard ? (
                      <img
                        className="salon-cover"
                        src={salonHeroImage}
                        alt={salon.name}
                      />
                    ) : (
                      <img
                        className="salon-placeholder-icon"
                        src={buildingIcon}
                        alt=""
                        aria-hidden="true"
                      />
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
                        <span>
                          {isComplete ? "Approved" : "Review pending"}
                        </span>
                        <img src={caretIcon} alt="" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="salon-meta-grid">
                      <div className="meta-item">
                        <img src={idIcon} alt="" aria-hidden="true" />
                        <span>{salon.code}</span>
                      </div>
                      <div className="meta-item">
                        <img src={phoneIcon} alt="" aria-hidden="true" />
                        <span>{salon.phone}</span>
                      </div>
                      {salon.location ? (
                        <div className="meta-item">
                          <img src={locationIcon} alt="" aria-hidden="true" />
                          <span>{salon.location}</span>
                        </div>
                      ) : null}
                      {salon.hours ? (
                        <div className="meta-item">
                          <img src={timeIcon} alt="" aria-hidden="true" />
                          <span>{salon.hours}</span>
                        </div>
                      ) : null}
                      {salon.imageCount ? (
                        <div className="meta-item">
                          <img src={galleryIcon} alt="" aria-hidden="true" />
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
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
