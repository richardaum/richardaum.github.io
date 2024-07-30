"use client";
import { openDrawerAtom } from "@/atoms/drawer";
import { clsx } from "@/utils/tailwind";
import { IconBrandDiscord, IconBrandGithub, IconBrandLinkedin, IconBrandSteam, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect, useRef, useState } from "react";
import { NavPanel } from "./NavPanel";
import { SelfPicture } from "./SelfPicture";

export function Drawer() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useAtom(openDrawerAtom);
  const [isLargerThanLg, setIsLargerThanLg] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsLargerThanLg(mediaQuery.matches);
    const listener = () => setIsLargerThanLg(mediaQuery.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (isLargerThanLg) setIsOpen(false);
  }, [isLargerThanLg, setIsOpen]);

  const [initialize, instance] = useOverlayScrollbars({
    options: {
      overflow: { x: "hidden" },
      scrollbars: { autoHide: "move", autoHideDelay: 400 },
    },
    defer: true,
  });

  useEffect(() => {
    if (!instance || !ref.current) return;
    initialize(ref.current);
  }, [instance, initialize]);

  const handleDrawerToggleClick = () => {
    if (!isOpen) {
      instance()?.elements().viewport.scrollTo({ top: 0 });
    }
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div
        ref={ref}
        id="drawer"
        className={clsx(
          "fixed right-0 top-0 z-30 size-full translate-x-full select-none overflow-auto bg-brownBeige-500 shadow-lg transition-all duration-300",
          isOpen ? "translate-x-0" : "translate-x-full opacity-0",
        )}
      >
        <NavPanel>
          <div className="mx-auto">
            <SelfPicture />
          </div>
        </NavPanel>
      </div>

      <button
        onClick={handleDrawerToggleClick}
        className={clsx(
          "focus-visible::bg-brownBeige-510",
          "fixed bottom-4 right-4 z-50",
          "flex size-14 items-center justify-center",
          "rounded-xl bg-brownBeige-500 text-brownBeige-600",
          "shadow-fab-default",
          "hover:bg-brownBeige-510 hover:shadow-fab-hover",
          "focus-visible:shadow-fab-hover",
          "active:bg-brownBeige-520 active:shadow-fab-pressed",
          "lg:hidden",
          "transition-all duration-300",
          {
            "bg-greyTones-300 hover:bg-greyTones-300/80 focus-visible:bg-greyTones-300/80 active:bg-greyTones-300/50 rounded-[56px]":
              isOpen,
          },
        )}
      >
        {isOpen ? <IconX className="size-6" /> : <SocialMediaAnimatedIcon />}
      </button>
    </>
  );
}

const elements = [
  <IconBrandLinkedin key="Linkedin" />,
  <IconBrandGithub key="Github" />,
  <IconBrandDiscord key="Discord" />,
  <IconBrandSteam key="Steam" />,
];

function SocialMediaAnimatedIcon() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.length);
    }, 2000); // 2000ms = 2s de intervalo entre transições
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="absolute"
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {elements[currentIndex]}
      </motion.div>
    </AnimatePresence>
  );
}
