import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, Services } from "../../../Interfaces/Types";

export class ObjectCar extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('object', ['car_svg']);
  }

  render(): void {
    const objectElement = this.element as HTMLObjectElement;
    objectElement.type = 'image/svg+xml';
    objectElement.data = '../assets/svg/car5.svg';
    objectElement.width = '50px';
    objectElement.height = '31px';
    objectElement.style.left = '0px';
    objectElement.style.transform = 'rotate(0deg)';
    objectElement.style.backgroundColor = this.car.color;

    this.parent.appendChild(this.element);

    this.services.Race.addImageCar(this.car.id, this.element);
  }
}