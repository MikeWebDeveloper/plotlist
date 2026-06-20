import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export function Breadcrumb({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <JsonLd data={breadcrumbJsonLd(items)} />
      {items.map((item, i) => (
        <span key={item.path}>
          {i > 0 && " › "}
          {i < items.length - 1 ? (
            <Link href={item.path}>{item.name}</Link>
          ) : (
            <span aria-current="page">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
