import { HomeSectionFragment } from "@/types/graphql";
import Markdown from "markdown-to-jsx";
import Image from "next/image";

export const HomeSection = ({ home }: { home: HomeSectionFragment }) => {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex m-6 text-pastel-mind">
        <div className="my-auto">
          <div className="mb-3 text-5xl">{home.upperText}</div>
          <div className="mb-5 text-6xl text-chetwode-blue">
            <Markdown
              options={{
                overrides: {
                  strong: {
                    component: "span",
                    props: { className: "font-bold" },
                  },
                },
              }}
            >
              {home.name!}
            </Markdown>
          </div>
          <div className="mb-16 font-bold text-4xl whitespace-pre">
            {home.role}
          </div>
          <div className="max-w-[555px] text-xl">{home.summary}</div>
        </div>
      </div>
      <Image
        src={home?.photo?.image?.url!}
        alt={home?.photo?.description!}
        width={home?.photo?.image?.width!}
        height={home?.photo?.image?.height!}
        priority
        style={{
          objectFit: "cover",
          width: home?.photo?.image?.width! * 1,
          height: home?.photo?.image?.height! * 1,
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      />
    </div>
  );
};
