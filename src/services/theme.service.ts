export const ThemeService = {
  isDark: false,
  setTheme(isDark: boolean): void {
    if (typeof (Storage) != 'undefined') {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      setThemeClass(isDark);
    } else {
      console.error('Sorry! No Web Storage support..');
    }
  },
  loadTheme(): void {
    if (typeof (Storage) != 'undefined') {
      const theme = localStorage.getItem('theme');
      const isDark = theme && theme === 'dark';
      this.isDark = isDark;
      setThemeClass(isDark);
    }
    else {
      console.error('Sorry! No Web Storage support..');
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
