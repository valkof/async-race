import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, Services } from "../../../Interfaces/Types";

export class ObjectFinish extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('object', ['finish_svg']);
  }

  render(): void {
    const objectElement = this.element as HTMLObjectElement;
    objectElement.type = 'image/svg+xml';
    objectElement.data = './assets/svg/flag.svg';

    this.parent.appendChild(this.element);
  }
}