import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services, Status } from "../../Interfaces/Types";

export class MessageWinner extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('span', ['span_winner_race']);
  }

  render(): void {
    this.parent.appendChild(this.element);
    
    const update = (status: Status) => {
      if (!status.winner.success) {
        this.element.innerText = '';
        return;
      }
      const nameWinner = `Winner: ${status.winner.name}`;
      const timeWinner = `Time: ${status.winner.time}s`;
      this.element.innerText = `${nameWinner}, ${timeWinner}`;
    }
    
    this.services.Race.addListener('winnerGame', (status: Status) => {
      update(status);
    })
    
    this.services.Race.addListener('updateGarage', (status: Status) => {
      update(status);
    })
  }
}