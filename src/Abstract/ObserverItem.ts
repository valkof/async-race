type TObserverItem = {
  name: string;
  callback: (...params: string[]) => void;
}

interface IObserverItem {
  addListener: (name: string, callback: (...params: string[]) => void) => void;
  dispath: (name: string, ...params: string[]) => void;
}

export class ObserverItem implements IObserverItem {
  private listeners: TObserverItem[] = [];

  addListener(name: string, callback: (...params: string[]) => void): void {
    this.listeners.push({ name, callback });
  }

  dispath(name: string, ...params: string[]): void {
    this.listeners.filter(it => it.name === name).forEach(it => it.callback(...params));
  }
}
