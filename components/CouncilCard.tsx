import Link from "next/link";
import { type Council, isVerified, waitSummary } from "@/data/councils";

export function CouncilCard({ council }: { council: Council }) {
  const verified = isVerified(council);
  const wait = verified ? waitSummary(council) : null;

  return (
    <Link href={`/${council.slug}`} className="card">
      <div className="card-top">
        <span className="name">{council.shortName}</span>
        <span aria-hidden className="card-arrow">→</span>
      </div>
      <div className="meta">{council.region}</div>
      <div className="card-foot">
        {verified && wait ? (
          <span className="badge verified">Wait: {wait}</span>
        ) : (
          <span className="badge unverified">How to apply</span>
        )}
      </div>
    </Link>
  );
}
