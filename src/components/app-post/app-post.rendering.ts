import { TutorialSection } from './app-post.section';

export function renderCode(code: string, language: string) {
  return `<pom-code language="${language}" code="${code}"></pom-code>`;
}

export function renderImage(href: string, title: string, text: string) {
  return `<pom-image caption="${title}" src="${href}" alt="${text}"></pom-image>`;
}

export function renderHeading(text: string, level: number, sections: TutorialSection[]) {
  if (level !== 2) {
    return `<h${level}>${text}</h${level}>`;
  }

  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  if (!sections.find(s => s.id === escapedText)) {
    sections.push({ id: escapedText, text, active: false });
  }
  return `<h${level} class="section-header" id="${escapedText}">
            <span>${text}</span>
            <a name="${escapedText}" href="#${escapedText}">
              <ion-icon name="link"></ion-icon>
            </a>
          </h${level}>`;
}
