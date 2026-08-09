import Link from "next/link";

type Variant = "eligibility" | "prepare" | "apply";

const COPY: Record<Variant, { label: (country: string) => string; href: (country: string) => string }> = {
  eligibility: { label: (c) => `Check eligibility for ${c}`, href: () => "#eligibility" },
  prepare: { label: (c) => `Prepare my IDP for ${c}`, href: (c) => `/apply?destination=${encodeURIComponent(c)}` },
  apply: { label: (c) => `Start my ${c} application`, href: (c) => `/apply?destination=${encodeURIComponent(c)}` },
};

export default function ContextualCta({
  variant,
  countryName,
}: {
  variant: Variant;
  countryName: string;
}) {
  const config = COPY[variant];

  return (
    <Link href={config.href(countryName)} className="btn btn-primary btn-lg">
      {config.label(countryName)}
    </Link>
  );
}
