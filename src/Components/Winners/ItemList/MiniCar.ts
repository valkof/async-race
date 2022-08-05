import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, Services } from "../../../Interfaces/Types";

export class MiniCar extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('object', ['car_svg']);
  }

  render(): void {
    const objectElement = this.element as HTMLObjectElement;
    objectElement.type = 'image/svg+xml';
    objectElement.data = '../assets/svg/car5.svg';
    objectElement.width = '20';
    objectElement.style.left = '0px';
    objectElement.style.backgroundColor = '#555555';

    this.parent.appendChild(this.element);
  }
}