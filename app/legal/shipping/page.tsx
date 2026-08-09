import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Shipping & delivery",
  description:
    "How Apply IDP Online delivers digital and printed International Driving Permits, and what to expect for timing and tracking.",
  alternates: { canonical: "/legal/shipping" },
};

export default function ShippingPolicyPage() {
  return (
    <LegalLayout title="Shipping & delivery" updated="July 2026">
      <h2>Digital permit</h2>
      <p>
        Where a digital IDP is included in your plan, it is delivered by email to the address on your
        order after our team has reviewed your application. The exact turnaround for your order is shown
        during checkout and in your order confirmation.
      </p>

      <h2>Printed booklet</h2>
      <p>
        Where a printed booklet is included, it is prepared after review and shipped to the delivery
        address you provide. Delivery timing depends on your location and the shipping method available
        at checkout; tracked delivery is offered where available.
      </p>

      <h2>Processing time vs. delivery time</h2>
      <p>
        These are two separate stages. Processing is the time we take to review your documents and
        prepare the permit. Delivery is the time the carrier takes afterwards. The estimates shown at
        checkout apply to your specific order and plan.
      </p>

      <h2>Correct delivery details</h2>
      <p>
        Please make sure your delivery address and contact details are accurate. We prepare shipments
        using the details you provide, and incorrect information can delay or prevent delivery.
      </p>

      <h2>International delivery</h2>
      <p>
        International shipments can be affected by customs handling and local postal conditions outside
        our control, which may extend delivery times beyond the initial estimate.
      </p>

      <h2>Delays or lost shipments</h2>
      <p>
        If your order has not arrived within the expected window, contact us through the{" "}
        <Link href="/contact">contact page</Link> with your order reference and we will help track it.
        Refund eligibility is covered separately in our{" "}
        <Link href="/legal/refund-policy">refund policy</Link>.
      </p>
    </LegalLayout>
  );
}
