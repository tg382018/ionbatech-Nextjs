import { FAQJsonLd, OrganizationJsonLd } from "next-seo";

import { faqSection } from "@/lib/constants";
import { siteDescription, siteUrl } from "@/lib/seo";

export function SiteJsonLd() {
  const description = siteDescription;

  const faqQuestions = faqSection.items.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  return (
    <>
      <OrganizationJsonLd
        type="Organization"
        name="IonBATech"
        url={siteUrl}
        description={description}
        scriptKey="ionbatech-organization"
      />
      <FAQJsonLd
        questions={faqQuestions}
        scriptKey="ionbatech-faq"
      />
    </>
  );
}
