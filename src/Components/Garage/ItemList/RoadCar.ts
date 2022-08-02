import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, Services } from "../../../Interfaces/Types";

export class RoadCar extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('div', ['item__road']);
  }

  render(): void {
    // <object type="image/svg+xml" data="myImage.svg" width="80"></object>
    const svg = new BaseComponent('object', ['car_svg']);
    (svg.element as HTMLObjectElement).type = 'image/svg+xml';
    (svg.element as HTMLObjectElement).data = '../assets/svg/car5.svg';
    (svg.element as HTMLObjectElement).width = '50';
    (svg.element as HTMLObjectElement).style.left = '0';
    (svg.element as HTMLObjectElement).style.backgroundColor = this.car.color;
    this.element.appendChild(svg.element);

    // движение
    /* const startTime = new Date().getTime();
    function step() {
      const currentTime = new Date().getTime();
      const left = (currentTime - startTime) / 1000 * 100;
      (svg.element as HTMLObjectElement).style.left = `${left}px`;
      if (left < 1000) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step); */


    this.parent.appendChild(this.element);
  }
}