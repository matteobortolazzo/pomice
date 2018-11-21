export function handleSectionHighlight(sections: TutorialSection[]): TutorialSection[] {
  const scrollTop = document.documentElement.scrollTop + 60;
  const visitedSections = sections.filter(s => s.top && s.top < scrollTop + 60).reverse();
  sections.forEach(s => s.active = false);
  if (visitedSections.length > 0) {
    visitedSections[0].active = true;
  }
  return [...sections];
}

export interface TutorialSection {
  id: string;
  text: string;
  top?: number;
  active: boolean;
}
