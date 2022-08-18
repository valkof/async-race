import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, ServiceItem, Services } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonSelect extends ElementButton implements IBaseInterface {
  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private readonly car: Car,
    private readonly serviceItem: ServiceItem
  ) {
    super('Select');
  }

  render(): void {
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      this.services.Race.selectOldCar(this.car);
    })

    this.serviceItem.Item.addListener('stageGame', (stage: string) => {
      this.element.disabled = 'stop' !== stage;
    })
  }
}