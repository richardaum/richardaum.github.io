"use client";

export function IntroductionContent() {
  return (
    <div className="flex items-center">
      <div className="mx-auto flex flex-col gap-6 px-8">
        <span className="font-display text-4xl text-greyTones-500">Hello!</span>
        <h1 className="font-display text-5xl">
          I&apos;m <span className="text-redPink-500">Richard</span>,
          <br />
          Frontend Engineer
        </h1>
        <p className="text-lg leading-8">
          Thriving in fast-paced environments, I ensure high code quality and pixel-perfect accuracy as a fullstack
          developer focused on frontend, consistently hitting tight deadlines with passion and dedication.
        </p>
      </div>
    </div>
  );
}
