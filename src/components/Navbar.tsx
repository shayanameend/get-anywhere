import Link from "next/link";
import { CartButton, Logo } from "@/components/";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-screen-lg items-center justify-between gap-4 px-4 py-8">
      <Link href="/">
        <Logo />
      </Link>
      <ul className="flex items-center gap-4">
        <li>
          <CartButton />
        </li>
      </ul>
    </nav>
  );
}
