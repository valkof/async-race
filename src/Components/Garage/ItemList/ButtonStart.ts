import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, ServiceItem, Services } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonStart extends ElementButton implements IBaseInterface {
  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private readonly car: Car,
    private readonly serviceItem: ServiceItem
  ) {
    super('Start');
  }

  render(): void {
    this.element.disabled = 'stop' !== this.serviceItem.Item.getStageGame();
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      this.serviceItem.Item.setStageGame('start');
      this.services.Race.startDriveCar(this.car, (stage: 'drive' | 'finish') => {
        this.serviceItem.Item.setStageGame(stage);
      });
      this.services.Race.stopRace();
    })

    this.serviceItem.Item.addListener('stageGame', (stage: string) => {
      this.element.disabled = 'stop' !== stage;
      if (stage === 'stop') this.services.Race.isBeginRace();
    })
  }
}