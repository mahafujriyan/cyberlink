export const CONTENT_FILES = [
  { key: "home", label: "Home Page", relativePath: "app/(home)/homeData.json" },
  { key: "about", label: "About Page", relativePath: "app/about/aboutData.json" },
  { key: "pricing", label: "Pricing Page", relativePath: "app/pricing/pricingData.json" },
  { key: "offers", label: "Offers Page", relativePath: "app/offers/offersData.json" },
  { key: "coverage", label: "Coverage Page", relativePath: "app/coverage/coverageData.json" },
  { key: "contact", label: "Contact Page", relativePath: "app/contact/contactData.json" },
  { key: "payBill", label: "Pay Bill Page", relativePath: "app/pay-bill/payBillData.json" },
  { key: "selfcare", label: "Selfcare Page", relativePath: "app/selfcare/selfcareData.json" },
  { key: "articles", label: "Articles Page", relativePath: "app/articles/articlesData.json" },
  { key: "packages", label: "Connection Packages", relativePath: "app/data/packagesData.json" },
  { key: "services", label: "Services Catalog", relativePath: "app/services/service.json" },
];

export function getContentFileByKey(key) {
  return CONTENT_FILES.find((item) => item.key === key) || null;
}
