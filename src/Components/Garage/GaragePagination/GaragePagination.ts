import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services } from "../../../Interfaces/Types";
import { ButtonLastGarage } from "./ButtonLastGarage";
import { ButtonNextGarage } from "./ButtonNextGarage";
import { SpanPageGarage } from "./SpanPageGarage";

export class GaragePagination extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', ['section__pagination']);
  }

  render(): void {
    new ButtonLastGarage(this.element, this.services).render();
    new SpanPageGarage(this.element, this.services).render();
    new ButtonNextGarage(this.element, this.services).render();

    this.parent.appendChild(this.element);
  }
}