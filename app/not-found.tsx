import Link from "next/link";

export default function NotFound() {
  return (
    <article style={{ padding: "48px 0" }}>
      <h1>Page not found</h1>
      <p className="lede">
        We don&apos;t have a page for that. We may not have added that council
        yet.
      </p>
      <Link href="/" className="cta">
        Back to all councils
      </Link>
    </article>
  );
}
