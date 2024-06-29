import { HomeSectionFragment } from "@/types/graphql";
import { kebabCase } from "lodash";
import Markdown from "markdown-to-jsx";
import Image from "next/image";

export const HomeSection = ({ home }: { home: HomeSectionFragment }) => {
  return (
    <div className="col-span-2 grid min-h-screen grid-cols-subgrid" id={kebabCase(home.title!)}>
      <div className="text-pastel-mind m-6 flex">
        <div className="my-auto">
          <div className="mb-3 text-5xl">{home.upperText}</div>
          <div className="mb-5 text-6xl text-indigo-400">
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
          <div className="mb-16 whitespace-pre text-4xl font-bold">{home.role}</div>
          <div className="max-w-[555px] text-xl">{home.summary}</div>
        </div>
      </div>
      <Image
        className="ml-auto mt-auto object-cover"
        src={home?.photo?.image?.url!}
        alt={home?.photo?.description!}
        width={home?.photo?.image?.width!}
        height={home?.photo?.image?.height!}
        priority
      />
    </div>
  );
};
