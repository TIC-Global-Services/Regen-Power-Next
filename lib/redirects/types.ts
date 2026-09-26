export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
}

export interface StrapiRedirectEntry {
  source?: string | null;
  destination?: string | null;
  permanent?: boolean | null;
}
