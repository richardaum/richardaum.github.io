const sections = [
  { id: "recent-work", label: "Recent work" },
  { id: "side-projects", label: "Side projects" },
  { id: "technologies", label: "Technologies" },
] as const;

export function SectionNav() {
  return (
    <nav
      aria-label="Portfolio sections"
      className="sticky top-[84px] z-10 mb-8 flex w-fit translate-x-5 gap-1 rounded-full border border-greyTones-500/80 bg-greyTones-300/95 p-1 shadow-sm backdrop-blur"
    >
      {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-greyTones-600 transition-colors hover:bg-darkColors-900 hover:text-greyTones-300"
          >
            {section.label}
          </a>
      ))}
    </nav>
  );
}
