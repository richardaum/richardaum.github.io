import { PageQuery } from "@/types/graphql";
import Image from "next/image";
import { Fragment } from "react";

type Props = {
  sections: NonNullable<
    NonNullable<PageQuery["page"]>["sectionsCollection"]
  >["items"];

  socialMedias: NonNullable<
    NonNullable<PageQuery["home"]>["socialMediasCollection"]
  >["items"];
};

export function Navbar({ sections, socialMedias }: Props) {
  return (
    <nav className="bg-chetwode-blue w-[92px] min-h-screen flex flex-col justify-between">
      <ul role="menubar" className="flex flex-col items-center gap-4 pt-6">
        {sections
          .filter((section) => !section?.hideOnNavbar)
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
                  <path d="M0 1H20" stroke="#121212" strokeWidth="2" />
                </svg>
              )}
              <li className="select-none text-xl tracking-widest uppercase [writing-mode:vertical-lr] [direction:rtl]">
                {section?.title}
              </li>
            </Fragment>
          ))}
      </ul>

      <ul className="flex flex-col items-center gap-4 pb-6 mt-6">
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
