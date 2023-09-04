import { Lobster } from "next/font/google";

const lobster = Lobster({ weight: ["400"], subsets: ["latin"] });

export default function Logo() {
  return (
    <h1 className={`text-5xl underline text-gray-700 ${lobster.className}`}>
      Get Anywhere.
    </h1>
  );
}
