export interface StrapiSection {
  id: number;
  __component: string;
  [key: string]: unknown;
}

export interface StrapiSingleTypePage {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  sections?: StrapiSection[];
  data?: StrapiSection[];
}

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
