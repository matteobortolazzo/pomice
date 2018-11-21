export function getReadableLanguage(language: string) {
  if (language.toLowerCase() === 'csharp') {
    return 'C#';
  }
  return language;
}
