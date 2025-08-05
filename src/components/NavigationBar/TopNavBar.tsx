"use client";
import { AlignJustify, BellDot, ChevronDown, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { useSidebar } from "../ui/sidebar";
import { ModeToggle } from "@/components/NavigationBar/LightDarkModeToggleButton";

const TopNavBar = ({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex justify-between items-center w-full bg-white p-3">
      <div className="text-red-600 flex items-center gap-4">
        <AlignJustify
          height={24}
          width={24}
          onClick={(event) => {
            // onClick?.(event)
            toggleSidebar();
          }}
          className="cursor-pointer"
        />
        <span className="font-bold text-base">
          {pathname
            .split("/")
            .pop()
            ?.toLowerCase()
            .replace(/^./, (char) => char.toUpperCase())}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Search height={24} width={24} />
        <BellDot height={24} width={24} />
        <span className="flex items-center gap-2 rounded-4xl p-1 border">
          Eng <ChevronDown height={16} width={16} />
        </span>
      </div>
      <ModeToggle/>
    </div>
  );
};

export default TopNavBar;
