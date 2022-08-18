import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, ServiceItem, Services } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonRemove extends ElementButton implements IBaseInterface {
  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private readonly car: Car,
    private readonly serviceItem: ServiceItem
  ) {
    super('Remove');
  }

  render(): void {
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      this.element.disabled = true;
      this.services.Race.deleteOldCar(this.car.id);
    })

    this.serviceItem.Item.addListener('stageGame', (stage: string) => {
      this.element.disabled = 'stop' !== stage;
    })
  }
}