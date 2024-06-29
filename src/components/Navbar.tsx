import { At } from "@/types/array";
import { GetSinglePageQuery } from "@/types/graphql";
import { kebabCase } from "lodash";
import Image from "next/image";
import { Fragment } from "react";

type Props = {
  sections: At<GetSinglePageQuery, "page.sectionsCollection.items">[];
  socialMedias: any[];
};

export function Navbar({ sections, socialMedias }: Props) {
  return (
    <nav className="fixed flex h-screen w-[92px] flex-shrink-0 flex-col justify-between overflow-auto bg-indigo-400 text-gray-100">
      <ul role="menubar" className="flex flex-col items-center gap-4 pt-6">
        {sections
          .map((section, index) => {
            if (!section?.title) return;

            return (
              <Fragment key={section?.sys.id}>
                {index > 0 && (
                  <svg width="20" height="2" viewBox="0 0 20 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="stroke-gray-100" d="M0 1H20" strokeWidth="2" />
                  </svg>
                )}
                <li className="select-none tracking-widest [direction:rtl] [writing-mode:vertical-lr]">
                  <button
                    role="link"
                    className="after:ease-[cubic-bezier(0.65_0.05_0.36_1)] relative after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:origin-top-left after:scale-y-0 after:bg-gray-100 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-y-100"
                  >
                    <a href={`#${kebabCase(section.title)}`} className="text-xl uppercase">
                      {section.title}
                    </a>
                  </button>
                </li>
              </Fragment>
            );
          })
          .filter((section) => section != null)}
      </ul>

      <ul className="mt-6 flex flex-col items-center gap-4 pb-6">
        {socialMedias.map((socialMedia) => (
          <li key={socialMedia?.sys.id}>
            <a href={socialMedia?.url!} target="_blank" rel="noopener noreferrer">
              <Image
                src={socialMedia?.icon?.image?.url!}
                alt={socialMedia?.icon?.description!}
                width={24}
                height={24}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
