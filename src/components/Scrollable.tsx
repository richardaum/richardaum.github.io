"use client";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { HTMLAttributes, useEffect } from "react";

export const Scrollable = (props: HTMLAttributes<HTMLElement>) => {
  const [initialize, instance] = useOverlayScrollbars({
    options: {
      scrollbars: { autoHide: "move", autoHideDelay: 400 },
    },
    defer: true,
  });

  useEffect(() => {
    if (!instance) return;
    initialize(document.body);
  }, [instance, initialize]);

  return props.children;
};
