import logo from "@/assets/images/logo.svg";
import { DownloadCV } from "@/components/DownloadCV";
import { Drawer } from "@/components/Drawer";
import { IntroductionContent } from "@/components/IntroductionContent";
import { NavPanel } from "@/components/NavPanel";
import { RecentWork } from "@/components/RecentWork";
import { SelfPicture } from "@/components/SelfPicture";
import { SideProjects } from "@/components/SideProjects";
import { SectionNav } from "@/components/SectionNav";
import { Technologies } from "@/components/Technologies";
import styles from "@/components/NavPanel.module.css";
import { Img } from "@/components/Img";
import { clsx } from "@/utils/tailwind";

const maxWidth = clsx("max-w-[660px]");
const paddingRight = clsx("pr-8");
const resume = "/resume.pdf";

// eslint-disable-next-line import/no-unused-modules
export default async function Home() {
  return (
    <main className="grid min-h-screen gap-x-[148px] pt-[100px] lg:grid-cols-[auto_400px]">
        <div className={clsx("relative m-auto mt-6 lg:mt-auto", paddingRight, maxWidth)}>
          <div
            className={clsx(
              "fixed top-0 z-20 flex w-full select-none items-center bg-greyTones-300 py-6 pl-8 pr-6",
              maxWidth,
            )}
          >
            <Img src={logo} alt="Logo" className="h-6 w-auto lg:h-8" priority />
            <div className="hidden ml-auto lg:hidden">
              <a
                className="flex items-center gap-4 rounded-xl bg-darkColors-900/20 p-3"
                href={resume}
                rel="noreferrer"
                target="_blank"
              >
                <DownloadCV />
              </a>
            </div>
          </div>
          <IntroductionContent />
          <div className={clsx("absolute mt-8 pb-24 pl-3", paddingRight)}>
            <SectionNav />
            <div id="recent-work" className="scroll-mt-32">
              <RecentWork />
            </div>
            <div id="side-projects" className="scroll-mt-32">
              <SideProjects />
            </div>
            <div id="technologies" className="scroll-mt-32">
              <Technologies />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="fixed top-0 z-20 h-full w-[400px] bg-brownBeige-500" />
          <div className="fixed top-0 z-30 h-full w-[400px]">
            <NavPanel>
              <div className={`${styles.pictureSlot} pointer-events-none flex-1`}>
                <SelfPicture />
              </div>
            </NavPanel>
          </div>
        </div>
        <Drawer />
      </main>
  );
}
