/**
 * Populate queries for the case-study collection type (api::case-study.case-study).
 * In Strapi CMS, the relations/media on case-study are: images, caseStudyDetails, tables, pdf.
 */

export const caseStudyCollection = "populate=*";

export const caseStudyCard = "populate[images]=true";

export const caseStudyDetail =
  "populate[images]=true" +
  "&populate[caseStudyDetails]=true" +
  "&populate[tables]=true" +
  "&populate[pdf]=true";
