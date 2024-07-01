import { CompaniesSection } from "@/components/CompaniesSection";
import { HomeSection } from "@/components/HomeSection";
import { Navbar } from "@/components/Navbar";
import { SkillsSection } from "@/components/SkillsSection";
import { getSinglePage } from "@/graphql/getSinglePage";
import { getSkills } from "@/graphql/getSkills";
import { GetSinglePageQuery, GetSkillsQuery } from "@/types/graphql";
import { graphqlRequest } from "@/utils/graphql";
import { createSkillDictionary } from "@/utils/skills";

export default async function Home() {
  const singlePageResponse = await graphqlRequest<GetSinglePageQuery>(getSinglePage);
  const sections = singlePageResponse?.page?.sectionsCollection?.items.filter((section) => section != null) ?? [];

  const skillsResponse = await graphqlRequest<GetSkillsQuery>(getSkills);
  const skills = skillsResponse?.skillCollection!;

  return (
    <main className="text-neutral-100">
      <Navbar sections={sections} socialMedias={[]} />

      <div className="ml-[92px] grid grid-cols-2">
        {sections.map((section) => {
          return (
            <section key={section.sys.id} className="col-span-2 grid grid-cols-subgrid">
              {section?.__typename === "HomeSection" && <HomeSection home={section} />}
              {section?.__typename === "CompaniesSection" && <CompaniesSection companies={section} />}
              {section?.__typename === "SkillsSection" && (
                <SkillsSection section={section} skills={createSkillDictionary(skills)} />
              )}
            </section>
          );
        })}
      </div>

      <section>teste</section>
    </main>
  );
}
