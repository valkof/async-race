type TObserver = {
  name: string;
  callback: (...params: string[]) => void;
}

interface IObserver {
  addListener: (name: string, callback: (...params: string[]) => void) => void;
  dispath: (name: string, ...params: string[]) => void;
}

export class Observer implements IObserver {
  private listeners: TObserver[] = [];

  addListener(name: string, callback: (...params: string[]) => void): void {
    this.listeners.push({ name, callback });
  }

  dispath(name: string, ...params: string[]): void {
    this.listeners.filter(it => it.name === name).forEach(it => it.callback(...params));
  }
}
