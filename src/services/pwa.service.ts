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
  }
};
