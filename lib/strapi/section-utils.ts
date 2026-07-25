export function findSection<T extends { __component: string }>(
  sections: { __component: string }[],
  component: T["__component"]
): T | undefined {
  return sections.find((s) => s.__component === component) as T | undefined;
}

export function findSections<T extends { __component: string }>(
  sections: { __component: string }[],
  component: T["__component"]
): T[] {
  return sections.filter(
    (s) => s.__component === component
  ) as T[];
}
