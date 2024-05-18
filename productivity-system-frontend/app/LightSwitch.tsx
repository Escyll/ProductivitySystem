"use client";
import { useTheme } from "next-themes";
import Image from "next/image";

export function LightSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="absolute right-4 top-4"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Image
        className="dark:invert"
        src="/dark-mode.svg"
        alt="Swith dark and light mode"
        width={32}
        height={32}
      />
    </button>
  );
}
