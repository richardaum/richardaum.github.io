import { CompaniesSection } from "@/components/CompaniesSection";
import { HomeSection } from "@/components/HomeSection";
import { Navbar } from "@/components/Navbar";
import { SkillsSection } from "@/components/SkillsSection";
import getSinglePage from "@/graphql/getSinglePage.graphql";
import { GetSinglePageQuery } from "@/types/graphql";
import { graphqlRequest } from "@/utils/graphql";

export default async function Home() {
  const data = await graphqlRequest<GetSinglePageQuery>(getSinglePage);
  const sections =
    data?.page?.sectionsCollection?.items.filter(
      (section) => section != null
    ) ?? [];

  return (
    <main className="text-neutral-100">
      <Navbar sections={sections} socialMedias={[]} />

      <div className="grid grid-cols-2 ml-[92px]">
        {sections.map((section) => {
          return (
            <section
              key={section.sys.id}
              className="grid grid-cols-subgrid col-span-2"
            >
              {section?.__typename === "HomeSection" && (
                <HomeSection home={section} />
              )}
              {section?.__typename === "CompaniesSection" && (
                <CompaniesSection companies={section} />
              )}
              {section?.__typename === "SkillsSection" && (
                <SkillsSection skills={section} />
              )}
            </section>
          );
        })}
      </div>

      <section>teste</section>
    </main>
  );
}
