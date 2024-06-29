import { CompaniesSectionFragment } from "@/types/graphql";
import { calculateTotalYears } from "@/utils/companies";
import Image from "next/image";

export const CompaniesSection = ({
  companies,
}: {
  companies: CompaniesSectionFragment;
}) => {
  const items = companies.companiesCollection?.items;
  const list = items?.filter((e) => e != null) ?? [];
  const totalYears = calculateTotalYears(list ?? []);

  return (
    <div className="flex flex-col items-center col-span-2 bg-zinc-800 mx-6 p-8 rounded-2xl text-center">
      <h2 className="mb-4 text-xl">
        {companies.heading?.replace(
          "%years%",
          `${totalYears.roundedYears} years`
        )}
      </h2>
      <ul className="flex items-center gap-10">
        {list.map((company) => {
          return (
            <li
              key={company.sys.id}
              title={calculateTotalYears([company]).duration}
            >
              <a
                href={company.url!}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <Image
                  className="object-cover hover:scale-125 group-focus:scale-125 transition-all duration-300 ease-in-out"
                  src={company.brand?.image?.url!}
                  alt={company.brand?.description!}
                  width={company.brand?.image?.width!}
                  height={company.brand?.image?.height!}
                  style={{
                    width: company.brand?.image?.width!,
                    height: company.brand?.image?.height!,
                  }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
