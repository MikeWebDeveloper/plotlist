import Link from "next/link";
import { type Council } from "@/data/councils";

export function CouncilCard({ council }: { council: Council }) {
  const verified = Boolean(council.waitlist && !council.seed);
  return (
    <Link href={`/${council.slug}`} className="card">
      <div className="name">{council.shortName}</div>
      <div className="meta">{council.region}</div>
      <div style={{ marginTop: 8 }}>
        {verified ? (
          <span className="badge verified">Wait time on record</span>
        ) : (
          <span className="badge unverified">How to apply</span>
        )}
      </div>
    </Link>
  );
}
