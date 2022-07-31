// import { Main } from './Components/Main';
// import { Header } from './Components/Header';
// import { Services } from './Service/Service';
// import { StoreService } from './Service/StoreService';
// import { Footer } from './Components/Footer';

interface IApp {
  render: () => void;
}

export class App implements IApp {
  // private readonly services: Services;

  // constructor(private readonly root: HTMLElement, settings: string) {
  //   this.services = {
  //     store: new StoreService(settings)
  //   };
  // }

  // static getInitOption(): Promise<string> {
  //   return StoreService.getInitOption();
  // }

  render(): void {
    // new Header(this.root, this.services).render();
    
    // new Main(this.root, this.services).render();

    // new Footer(this.root, this.services).render();
  }
}
