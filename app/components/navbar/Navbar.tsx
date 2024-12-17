"use client";

import Container from "@/app/components/Container";
import Logo from "@/app/components/navbar/Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import { Session } from "next-auth";

interface NavbarProps {
  session?: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu session={session} />
          </div>
        </Container>
      </div>

      <Categories />
    </div>
  );
};

export default Navbar;
