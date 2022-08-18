import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, ServiceItem, Services } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonStop extends ElementButton implements IBaseInterface {
  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private readonly car: Car,
    private readonly serviceItem: ServiceItem
  ) {
    super('Stop');
  }

  render(): void {
    this.element.disabled = 'stop' === this.serviceItem.Item.getStageGame();
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      this.element.disabled = true;
      this.services.Race.restartDriveCar(this.car, (stage: 'stop') => {
        this.serviceItem.Item.setStageGame(stage);
      });
    })

    this.serviceItem.Item.addListener('stageGame', (stage: string) => {
      this.element.disabled = !('drive' === stage || 'finish' === stage);
    })
  }
}