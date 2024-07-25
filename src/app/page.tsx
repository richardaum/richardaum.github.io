import logo from "@/assets/images/logo.svg";
import { IntroductionContent } from "@/components/IntroductionContent";
import { NavPanel } from "@/components/NavPanel";
import { RecentWork } from "@/components/RecentWork";
import { SelfPicture } from "@/components/SelfPicture";
import Image from "next/image";

// eslint-disable-next-line import/no-unused-modules
export default async function Home() {
  return (
    <main className="grid min-h-screen grid-cols-[auto_400px] gap-y-8">
      <div className="relative m-auto max-w-[562px]">
        <div className="fixed top-0 z-20 w-full max-w-[562px] bg-greyTones-300 px-8 py-6">
          <Image src={logo} alt="Logo" />
        </div>

        <IntroductionContent />
        <div className="absolute mt-8">
          <RecentWork />
        </div>
      </div>
      <div>
        <div className="fixed h-full w-[400px] bg-brownBeige-500">
          <NavPanel />
        </div>
        <div className="pointer-events-none fixed flex h-screen translate-x-[-150px] items-center">
          <SelfPicture />
        </div>
      </div>
    </main>
  );
}
