export const VEHICLE_CATEGORIES = [
  { code: "A", label: "Motorcycle" },
  { code: "B", label: "Car" },
  { code: "C", label: "Truck" },
  { code: "D", label: "Bus" },
  { code: "E", label: "With trailer" },
] as const;

export function VehicleIcon({ code, size = 26 }: { code: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    "aria-hidden": true as const,
  };

  switch (code) {
    case "A":
      return (
        <svg {...common}>
          <circle cx="5.5" cy="17.5" r="2.8" strokeWidth="1.6" />
          <circle cx="18.5" cy="17.5" r="2.8" strokeWidth="1.6" />
          <path d="M5.5 17.5h5l2-6h5.5M12.5 11.5l2 6M9 8h3l1.5 3.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "B":
      return (
        <svg {...common}>
          <path d="M4 16v-3.5L6 8.5c.5-1 1-1.5 2.2-1.5h7.6c1.2 0 1.7.5 2.2 1.5l2 4V16" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 16h16" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="7.5" cy="16.3" r="1.7" strokeWidth="1.6" />
          <circle cx="16.5" cy="16.3" r="1.7" strokeWidth="1.6" />
        </svg>
      );
    case "C":
      return (
        <svg {...common}>
          <path d="M3 15V9h9v6M12 11h4l3 3v1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 15h1M19 15h1" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="7" cy="16.3" r="1.7" strokeWidth="1.6" />
          <circle cx="16.5" cy="16.3" r="1.7" strokeWidth="1.6" />
        </svg>
      );
    case "D":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="9" rx="1.8" strokeWidth="1.6" />
          <path d="M3 12h18M8 7v9M15 7v9" strokeWidth="1.4" />
          <circle cx="7" cy="18.3" r="1.4" strokeWidth="1.6" />
          <circle cx="17" cy="18.3" r="1.4" strokeWidth="1.6" />
        </svg>
      );
    case "E":
      return (
        <svg {...common}>
          <path d="M2 16v-3l1.5-3.5c.4-.8.9-1.2 1.8-1.2h4.2c.9 0 1.4.4 1.8 1.2L13 13v3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="13.5" y="10.5" width="7.5" height="5.5" rx="1" strokeWidth="1.5" />
          <circle cx="5.5" cy="16.3" r="1.5" strokeWidth="1.5" />
          <circle cx="17.2" cy="17.3" r="1.4" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
}
