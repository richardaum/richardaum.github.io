"use client";

import { useEffect, useState } from "react";
import styles from "./SidebarScatter.module.css";

type Pixel = {
  left: number;
  top: number;
  size: number;
  opacity: number;
  color: string;
};

const pixels = [
  [4, 2, 10, 10, 0.12],
  [18, 8, 6, 17, 0.12],
  [36, 4, 21, 21, 0.38],
  [53, 10, 27, 27, 0.38],
  [76, 3, 36, 36, 0.78],
  [10, 19, 12, 12, 0.12],
  [29, 18, 22, 22, 0.38],
  [47, 24, 29, 29, 0.38],
  [66, 21, 40, 40, 0.78],
  [16, 39, 17, 17, 0.12],
  [38, 42, 26, 26, 0.38],
  [59, 44, 33, 33, 0.78],
  [65, 40, 42, 42, 0.78],
  [25, 67, 19, 19, 0.12],
  [46, 75, 28, 28, 0.38],
  [66, 82, 40, 40, 0.78],
  [2, 13, 8, 8, 0.12],
  [24, 14, 10, 10, 0.12],
  [43, 15, 13, 13, 0.38],
  [67, 17, 18, 18, 0.78],
  [5, 29, 11, 11, 0.12],
  [22, 26, 14, 14, 0.12],
  [40, 32, 17, 17, 0.38],
  [68, 31, 21, 21, 0.78],
  [2, 51, 9, 9, 0.12],
  [27, 54, 13, 13, 0.12],
  [52, 56, 18, 18, 0.38],
  [72, 57, 24, 24, 0.78],
  [9, 76, 10, 10, 0.12],
  [35, 84, 14, 14, 0.38],
  [58, 91, 20, 20, 0.38],
  [72, 94, 32, 32, 0.78],
] as const;

function pseudoRandom(n: number, seed = 42) {
  const value = Math.sin(n * 12.9898 + seed) * 43758.5453;
  return value - Math.floor(value);
}

function getPixelOpacity(horizontal: number, size: number) {
  const scatterWidth = 336;
  const sidebarOverlap = 8;
  const pixelRight = (horizontal / 100) * scatterWidth + size;
  const distanceToSidebar = Math.max(0, scatterWidth - sidebarOverlap - pixelRight);
  const fadeDistance = scatterWidth;

  if (distanceToSidebar === 0) return 1;

  return 0.04 + (1 - distanceToSidebar / fadeDistance) * 0.68;
}

function createExtraPixels(): Pixel[] {
  return Array.from({ length: 468 }, (_, index) => {
    const horizontal = pseudoRandom(index * 2) * 100;
    const vertical = pseudoRandom(index * 2 + 1) * 100;
    const size = 20 + Math.floor(pseudoRandom(index + 1000) * 81);
    const opacity = getPixelOpacity(horizontal, size);
    const scatterWidth = 336;
    const sidebarOverlap = 8;
    const pixelRight = (horizontal / 100) * scatterWidth + size;
    const touchesSidebar = pixelRight > scatterWidth - sidebarOverlap;
    const color = !touchesSidebar && pseudoRandom(index + 2000) < 0.22 ? "#b66f4f" : "#bdab8c";

    return {
      left: horizontal,
      top: vertical,
      size,
      opacity,
      color,
    };
  });
}

const extraPixels = createExtraPixels();

export function SidebarScatter() {
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const updatePageHeight = () => setPageHeight(document.documentElement.scrollHeight);

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(updatePageHeight);
    });
    const timeout = window.setTimeout(updatePageHeight, 500);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className={styles.scatter}
      aria-hidden="true"
      style={{ height: pageHeight || undefined, visibility: pageHeight ? "visible" : "hidden" }}
    >
      {pixels.map(([left, top, width, height, opacity], index) => (
        <span
          className={styles.pixel}
          key={index}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${width}px`,
            height: `${height}px`,
            opacity: `${opacity}`,
          }}
        />
      ))}
      {extraPixels.map(({ left, top, size, opacity, color }, index) => (
        <span
          className={styles.pixel}
          key={`extra-${index}`}
          style={{
            left: `${left.toFixed(3)}%`,
            top: `${top.toFixed(3)}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity.toFixed(3),
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}
