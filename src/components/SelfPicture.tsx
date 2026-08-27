import blob from "@/assets/images/blob-authentic.png";
import me from "@/assets/images/me-fhd.webp";
import { Img } from "@/components/Img";
import styles from "./SelfPicture.module.css";

const blobUrl = typeof blob === "string" ? blob : blob.src;

export function SelfPicture() {
  return (
    <div
      className={styles.frame}
      style={{
        WebkitMaskImage: `url(${blobUrl})`,
        maskImage: `url(${blobUrl})`,
      }}
    >
      <Img
        src={me}
        alt="Richard's photo"
        fill
        quality={100}
        sizes="320px"
        className="object-cover object-[0%_18%]"
      />
    </div>
  );
}
