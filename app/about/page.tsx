import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About PlotList",
  description:
    "Why PlotList exists, how we source waiting-list data, and the honesty rules we hold ourselves to.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article>
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <h1>About {site.name}</h1>
      <p className="lede">
        Over 100,000 people are on UK allotment waiting lists, and every council
        runs its own system with its own page, its own rules and its own wait.
        PlotList pulls that scattered information into one place.
      </p>

      <h2>What we do</h2>
      <p>
        For each council we give you the same three things: where the official
        allotment page is, how to get on the waiting list in plain English, and —
        where we have checked a real published source — the typical wait.
      </p>

      <h2>How we handle waiting-list figures</h2>
      <p>
        Waiting times are the whole reason people search, so we are strict about
        them:
      </p>
      <ul>
        <li>
          We only show a wait time when we have read a real, official source for
          that specific council, and we show the date we checked it.
        </li>
        <li>
          If we haven&apos;t verified a figure, we say so plainly and send you to
          the council&apos;s own page. We never invent or estimate a wait.
        </li>
        <li>
          We never show star ratings or reviews for a public service that
          doesn&apos;t have them.
        </li>
      </ul>
      <p className="note">
        These rules are enforced in our codebase: the site will not build if a
        record carries a waiting-list figure without a real source and a
        verified date.
      </p>

      <h2>Independence</h2>
      <p>
        PlotList is an independent project of The Company. We are not affiliated
        with any council. Always confirm details on the official page before you
        rely on them.
      </p>
    </article>
  );
}
