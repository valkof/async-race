import { Status } from "../Interfaces/Types";

type TObserver = {
  name: string;
  callback: (status: Status, ...params: string[]) => void;
}

interface IObserver {
  addListener: (name: string, callback: (status: Status, ...params: string[]) => void) => void;
  dispath: (name: string, status: Status, ...params: string[]) => void;
}

export class Observer implements IObserver {
  private listeners: TObserver[] = [];

  addListener(name: string, callback: (status: Status, ...params: string[]) => void): void {
    this.listeners.push({ name, callback });
  }

  dispath(name: string, status: Status, ...params: string[]): void {
    this.listeners.filter(it => it.name === name).forEach(it => it.callback(status, ...params));
  }
}
