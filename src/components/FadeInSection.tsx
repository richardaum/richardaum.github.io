"use client";
import { motion, useInView, UseInViewOptions } from "framer-motion";
import { useRef } from "react";

export const FadeInSection = ({
  children,
  enabled,
  amount = 0.5,
}: {
  children: React.ReactNode;
  enabled: boolean;
  amount?: UseInViewOptions["amount"];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: inView && enabled ? 1 : 0, y: inView && enabled ? 0 : 100 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
