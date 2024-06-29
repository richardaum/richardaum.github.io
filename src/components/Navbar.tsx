import { At } from "@/types/array";
import { GetSinglePageQuery } from "@/types/graphql";
import Image from "next/image";
import { Fragment } from "react";

type Props = {
  sections: At<GetSinglePageQuery, "page.sectionsCollection.items">[];
  socialMedias: any[];
};

export function Navbar({ sections, socialMedias }: Props) {
  return (
    <nav className="fixed flex flex-col flex-shrink-0 justify-between bg-indigo-400 w-[92px] h-screen text-gray-100 overflow-auto">
      <ul role="menubar" className="flex flex-col items-center gap-4 pt-6">
        {sections
          .filter((section) => section.title)
          .map((section, index) => (
            <Fragment key={section?.sys.id}>
              {index > 0 && (
                <svg
                  width="20"
                  height="2"
                  viewBox="0 0 20 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="stroke-gray-100"
                    d="M0 1H20"
                    strokeWidth="2"
                  />
                </svg>
              )}
              <li className="tracking-widest select-none [writing-mode:vertical-lr] [direction:rtl]">
                <button
                  role="link"
                  className="relative after:top-0 after:left-0 after:absolute after:bg-gray-100 after:w-[2px] after:h-full after:origin-top-left after:scale-y-0 hover:after:origin-bottom-left after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:scale-y-100"
                >
                  <span className="text-xl uppercase">{section?.title}</span>
                </button>
              </li>
            </Fragment>
          ))}
      </ul>

      <ul className="flex flex-col items-center gap-4 mt-6 pb-6">
        {socialMedias.map((socialMedia) => (
          <li key={socialMedia?.sys.id}>
            <a
              href={socialMedia?.url!}
              target="_blank"
              rel="noopener noreferrer"
            >
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
