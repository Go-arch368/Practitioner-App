"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/image.png";

type HeaderProps = {
  handleClick?: () => void;
};

export default function Header({ handleClick }: HeaderProps) {
  return (
    <div
      className="header-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
      }}
    >
      <Link href="/" onClick={handleClick}>
        <Image
          src={Logo}
          alt="Claritev Logo"
          width={300}
          height={80}
          style={{ marginTop: "1rem", cursor: "pointer", height: "auto" }}
        />
      </Link>

      <Link
        href="/signout"
        className="text-blue-600 underline cursor-pointer"
      >
        Sign-Out
      </Link>
    </div>
  );
}
