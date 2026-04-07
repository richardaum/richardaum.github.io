import NextImage from "next/image";
import { forwardRef, type ComponentProps } from "react";

const DEFAULT_QUALITY = 85;

export type ImgProps = ComponentProps<typeof NextImage>;

/** Thin wrapper around `next/image` with shared defaults (`quality`, ref). */
export const Img = forwardRef<HTMLImageElement, ImgProps>(function Img(
  { quality = DEFAULT_QUALITY, ...props },
  ref,
) {
  return <NextImage ref={ref} quality={quality} {...props} />;
});
