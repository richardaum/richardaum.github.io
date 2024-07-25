import resume from "@/assets/files/resume.pdf";
import logo from "@/assets/images/logo.svg";
import { Drawer } from "@/components/Drawer";
import { IntroductionContent } from "@/components/IntroductionContent";
import { NavPanel } from "@/components/NavPanel";
import { RecentWork } from "@/components/RecentWork";
import { ScrollHint } from "@/components/ScrollHint";
import { SelfPicture } from "@/components/SelfPicture";
import { clsx } from "@/utils/tailwind";
import { IconDownload } from "@tabler/icons-react";
import { Provider } from "jotai";
import Image from "next/image";

const maxWidth = clsx("max-w-[660px]");
const paddingRight = clsx("pr-8");

// eslint-disable-next-line import/no-unused-modules
export default async function Home() {
  return (
    <Provider>
      <main className="grid min-h-screen gap-x-[148px] pt-[100px] lg:grid-cols-[auto_400px]">
        <div className={clsx("relative m-auto", paddingRight, maxWidth)}>
          <div
            className={clsx(
              "fixed top-0 z-20 flex w-full select-none items-center bg-greyTones-300 py-6 pl-8 pr-6",
              maxWidth,
            )}
          >
            <Image src={logo} alt="Logo" className="h-6 w-auto lg:h-8" />
            <div className="ml-auto lg:hidden">
              <a
                className="flex items-center gap-4 rounded-xl bg-darkColors-900/20 p-3"
                href={resume}
                rel="noreferrer"
                target="_blank"
              >
                Download CV <IconDownload />
              </a>
            </div>
          </div>
          <IntroductionContent />
          <div className={clsx("absolute mt-8 pb-24 pl-3", paddingRight)}>
            <RecentWork />
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="fixed top-0 z-20 h-full w-[400px] bg-brownBeige-500" />
          <div className="fixed top-0 z-30 h-full w-[400px]">
            <NavPanel />
          </div>
          <div className="pointer-events-none fixed z-20 flex h-screen translate-x-[-150px] translate-y-[-100px] items-center">
            <SelfPicture />
          </div>
        </div>
        <ScrollHint />
        <Drawer />
      </main>
    </Provider>
  );
}
