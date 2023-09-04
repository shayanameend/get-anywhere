import Link from "next/link";
import { CartButton, Logo, SignInButton, SignOutButton } from "@/components/";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-screen-lg items-center justify-between gap-4 px-4 py-8">
      <Logo />
      <ul className="flex items-center gap-4">
        <li>
          <CartButton />
        </li>
        <li>
          <SignInButton />
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
