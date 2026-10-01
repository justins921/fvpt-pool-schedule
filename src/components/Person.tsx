import Image from "next/image";
import type { TeamMember } from "@/content/collections";

// Headshot, or a branded placeholder for staff whose photo we don't have yet.
export default function Headshot({ m, size }: { m: TeamMember; size: number }) {
  if (m.photo) return <Image src={m.photo} alt={m.name} width={size} height={size} />;
  return (
    <div className="headshot-placeholder" role="img" aria-label={m.name}>
      <Image src="/img/logo.png" alt="" width={72} height={72} />
    </div>
  );
}
