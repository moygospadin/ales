export class LocalStorageService {
  static instance?: LocalStorageService;

  constructor() {
    if (LocalStorageService.instance) {
      return LocalStorageService.instance;
    }

    LocalStorageService.instance = this;
  }

  setItem = (key: string, data: string) => {
    localStorage.setItem(key, data);
  };

  getItem = (key: string) => {
    const item = localStorage.getItem(key);
    if (item) {
      return item;
    }
  };

  removeItem = (key: string) => {
    localStorage.removeItem(key);
  };
}
