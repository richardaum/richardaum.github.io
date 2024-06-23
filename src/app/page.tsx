import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/types/graphql";

const client = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
  {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
  }
);

export default async function Home() {
  const sdk = getSdk(client);
  const data = await sdk.page();

  const home = data.home;
  const sections = data.page?.sectionsCollection?.items ?? [];
  const socialMedias = home?.socialMediasCollection?.items ?? [];

  return (
    <main className="flex">
      <Navbar sections={sections} socialMedias={socialMedias} />

      {sections[0]?.content?.__typename === "Home" &&
        sections[0]?.content?.upperText}

      <Image
        src={home?.photo?.image?.url!}
        alt={home?.photo?.description!}
        width={home?.photo?.image?.width!}
        height={home?.photo?.image?.height!}
        style={{
          objectFit: "cover",
          width: home?.photo?.image?.width!,
          height: home?.photo?.image?.height!,
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      />
    </main>
  );
}
