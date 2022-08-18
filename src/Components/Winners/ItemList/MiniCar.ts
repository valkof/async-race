import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { CarWinner, Services } from "../../../Interfaces/Types";

export class MiniCar extends BaseComponent implements IBaseInterface {
  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private readonly car: CarWinner
  ) {
    super('object', ['minicar_svg']);
  }

  render(): void {
    const objectElement = this.element as HTMLObjectElement;
    objectElement.type = 'image/svg+xml';
    objectElement.data = './assets/svg/car5.svg';
    objectElement.width = '20px';
    objectElement.height = '13px';
    objectElement.style.left = '0px';
    objectElement.style.backgroundColor = this.car.color;

    this.parent.appendChild(this.element);
  }
}