import Link from "next/link";
import { Lobster } from "next/font/google";

const lobster = Lobster({ weight: ["400"], subsets: ["latin"] });

export default function Logo() {
  return (
    <Link href="/">
      <h1 className={`text-3xl underline text-gray-700 ${lobster.className}`}>
        Get Anywhere.
      </h1>
    </Link>
  );
}
