import { CompaniesSectionFragment } from "@/types/graphql";
import { calculateTotalYears } from "@/utils/companies";
import { DateTime } from "luxon";
import Image from "next/image";

export const CompaniesSection = ({
  companies,
}: {
  companies: CompaniesSectionFragment;
}) => {
  const safeCompanies =
    companies.companiesCollection?.items.filter((e) => e != null) ?? [];

  const totalYears = calculateTotalYears(safeCompanies ?? []);

  return (
    <div className="flex flex-col items-center bg-zinc-800 mx-6 p-8 rounded-2xl text-center">
      <h2 className="mb-4 text-xl">
        {companies.heading?.replace(
          "%years%",
          `${totalYears.roundedYears} years`
        )}
      </h2>
      <ul className="flex items-center gap-10">
        {safeCompanies.map((company) => {
          return (
            <li
              key={company.sys.id}
              title={calculateTotalYears([company]).duration}
            >
              <a href={company.url!} target="_blank" rel="noreferrer">
                <Image
                  src={company.brand?.image?.url!}
                  alt={company.brand?.description!}
                  width={company.brand?.image?.width!}
                  height={company.brand?.image?.height!}
                  style={{
                    objectFit: "cover",
                    width: company.brand?.image?.width! * 1,
                    height: company.brand?.image?.height! * 1,
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
