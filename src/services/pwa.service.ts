export const PwaService = {
  installPromptEvent: undefined,
  callbacks: [],
  subscribe(callback: () => void) {
    this.callbacks.push(callback);
  },
  handleInstallEvent(event) {
    event.preventDefault();
    this.installPromptEvent = event;
    this.callbacks.forEach(c => c());
  },
  prompt() {
    this.installPromptEvent.prompt();
  },
  needUpdate(currentVersion: string): boolean {
    if (typeof (Storage) === 'undefined') {
      return false;
    }
    const installedVersion = localStorage.getItem('version');
    if (installedVersion === null) {
      localStorage.setItem('version', currentVersion);
      return false;
    }
    if (installedVersion !== currentVersion) {
      localStorage.setItem('version', currentVersion);
      return true;
    }
    return false;
  }
};
