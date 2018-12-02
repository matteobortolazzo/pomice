export const ThemeService = {
  isDark: false,
  setTheme(isDark: boolean): void {
    if (typeof (Storage) != 'undefined') {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      setThemeClass(isDark);
    }
  },
  loadTheme(): void {
    if (typeof (Storage) != 'undefined') {
      const theme = localStorage.getItem('theme');
      const isDark = theme && theme === 'dark';
      this.isDark = isDark;
      setThemeClass(isDark);
    }
  }
};

function setThemeClass(isDark: boolean) {
  const body = document.querySelector('body');
  const alreadyDarK = body.classList.contains('dark');
  if (isDark && !alreadyDarK) {
    document.querySelector('body').classList.add('dark');
  } else if (!isDark && alreadyDarK) {
    document.querySelector('body').classList.remove('dark');
  }
}
