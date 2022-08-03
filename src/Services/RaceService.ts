import { Observer } from "../Abstract/Observer";
import { Car, NamesOfCars, Status } from "../Interfaces/Types";
import { createCar, deleteCar, getCars, updateCar } from "./GarageService";
import { getInitSettingsFromJSON, getNamesOfCarsFromJSON } from "./getSettings";
import { getWinners } from "./WinnersService";

export class RaceService extends Observer {
  
  private namesOfCars = {} as NamesOfCars;

  private status = {} as Status;
  
  constructor(namesOfCars: string) {
    super();

    Object.assign(this.namesOfCars, JSON.parse(namesOfCars));

    getInitSettingsFromJSON()
      .then(status => {
        Object.assign(this.status, status);
        this.dispath('openPage', this.status);
        this.updatePages();
      })
  }

  static getNameOfCars(): Promise<string> {
    return new Promise((resolve, reject) => {
      getNamesOfCarsFromJSON()
        .then(namesOfCars => {
          const settings = JSON.stringify(namesOfCars);
          resolve(settings);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  openPage(namePage: string): void {
    this.status.currentPage = namePage;
    this.dispath('openPage', this.status);
  }

  private updatePages(): void {
    this.updateGarage();
    this.updateWinners();
  }

  private updateGarage(): void {
    getCars(this.status.paginationGarage)
      .then(response => {
        Object.assign(this.status, response);
        this.dispath('updateGarage', this.status);
      });
  }

  private updateWinners(): void {
    getWinners(this.status.paginationWinners, this.status.fieldSort, this.status.orderSort)
      .then(response => {
        Object.assign(this.status, response);
        this.dispath('updateWinners', this.status);
      });
  }

  createNewCar(): void {
    this.dispath('createCar', this.status);
    createCar(this.status.newCar)
      .then(() => {
        this.status.newCar.name = '';
        this.updateGarage();
      });
  }

  selectOldCar(car: Car): void {
    this.status.idOldCar = car.id;
    this.status.oldCar.name = car.name;
    this.status.oldCar.color = car.color;
    this.dispath('updatePanel', this.status);
  }

  updateOldCar(): void {
    this.dispath('updateCar', this.status);
    updateCar(this.status.idOldCar, this.status.oldCar)
      .then(() => {
        this.status.oldCar.name = '';
        this.updateGarage();
      });
  }

  deleteOldCar(id: number): void {
    deleteCar(id)
      .then(() => {
        this.updateGarage();
      })
  }

  private Randomize(number: number): number {
    return Math.floor(Math.random() * number);
  }

  generationCars(count: number): void {
    if (count === 0) {
      this.updateGarage();
      return;
    }
    const numberBrand = this.Randomize(10);
    const numberModel = this.Randomize(10);
    const brand = this.namesOfCars.cars[numberBrand].brand;
    const model = this.namesOfCars.cars[numberBrand].models[numberModel];
    const colorRed = this.Randomize(255).toString(16).padStart(2, '0');
    const colorGreen = this.Randomize(255).toString(16).padStart(2, '0');
    const colorBlue = this.Randomize(255).toString(16).padStart(2, '0');
    createCar({
      name: `${brand} ${model}`,
      color: `#${colorRed}${colorGreen}${colorBlue}`
    })
      .then(() => {
        this.generationCars(count - 1);
      });
  }
}