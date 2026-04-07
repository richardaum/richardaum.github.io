import blob from "@/assets/images/blob.svg";
import me from "@/assets/images/me.webp";
import { Img } from "@/components/Img";

export function SelfPicture() {
  return (
    <div className="relative">
      <div className="relative z-20 h-[433px] w-[283px]">
        <Img
          src={me}
          alt="Richard's photo"
          fill
          quality={100}
          sizes="283px"
          className="z-10 rounded-full object-cover object-left"
        />
      </div>
      <div className="absolute top-0 z-10">
        <div className="relative h-[400px] w-[409px]">
          <Img
            src={blob}
            alt="Blob"
            className="translate-y-[-20px] object-contain"
            fill
            quality={100}
            sizes="409px"
          />
        </div>
      </div>
    </div>
  );
}
