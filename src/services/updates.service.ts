export function needUpdate(): boolean {
  if (typeof (Storage) !== 'undefined') {
    const alreadyOpened = localStorage.getItem('alreadyOpened');
    if (alreadyOpened !== undefined) {
      return true;
    }
    localStorage.setItem('alreadyOpened', 'true');
  }
  return false;
}
