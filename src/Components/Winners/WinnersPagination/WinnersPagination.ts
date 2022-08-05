import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services } from "../../../Interfaces/Types";
import { ButtonLastWinners } from "./ButtonLastWinners";
import { ButtonNextWinners } from "./ButtonNextWinners";
import { SpanPageWinners } from "./SpanPageWinners";

export class WinnersPagination extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', ['section__pagination']);
  }

  render(): void {
    new ButtonLastWinners(this.element, this.services).render();
    new SpanPageWinners(this.element, this.services).render();
    new ButtonNextWinners(this.element, this.services).render();

    this.parent.appendChild(this.element);
  }
}