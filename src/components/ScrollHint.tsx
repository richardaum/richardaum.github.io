"use client";
import { IconMouse } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tippy";

export function ScrollHint() {
  const [visible, setVisible] = useState(false);

  // check scrolltop > 0
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY === 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    visible && (
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}>
          {/* @ts-expect-error children mismatch */}
          <Tooltip title="Swipe up / Scroll down" position="top">
            <div className="z-20 grid size-12 place-content-center rounded-full bg-greyTones-400 text-brownBeige-600 shadow-fab-default">
              <IconMouse className="size-8" />
            </div>
          </Tooltip>
        </motion.div>
      </div>
    )
  );
}
