import { CompaniesSection } from "@/components/CompaniesSection";
import { HomeSection } from "@/components/HomeSection";
import { Navbar } from "@/components/Navbar";
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

      {sections.map((section) => {
        return (
          <section key={section.sys.id} className="ml-[92px]">
            {section?.__typename === "HomeSection" && (
              <HomeSection home={section} />
            )}
            {section?.__typename === "CompaniesSection" && (
              <CompaniesSection companies={section} />
            )}
          </section>
        );
      })}
      <section>teste</section>
    </main>
  );
}
