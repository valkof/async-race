import { Observer } from "../Abstract/Observer";
import { AnimationCars, Car, Engine, FieldSort, Finish, ImageCars, NamesOfCars, Status } from "../Interfaces/Types";
import { animation, carEngineDriveMode, carStartStopEngine } from "./DriveService";
import { createCar, deleteCar, getCar, getCars, updateCar } from "./GarageService";
import { getInitSettingsFromJSON, getNamesOfCarsFromJSON } from "./getSettings";
import { addWinner, getWinners } from "./WinnersService";

export class RaceService extends Observer {
  
  private namesOfCars = {} as NamesOfCars;

  private status = {} as Status;

  private imagesCars = {} as ImageCars;

  private animationCars = {} as AnimationCars;

  private traceCars = [] as number[];
  
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
        this.imagesCars = {};
        this.dispath('updateGarage', this.status);
      });
  }

  private updateWinners(): void {
    getWinners(this.status.paginationWinners, this.status.fieldSort, this.status.orderSort)
      .then(responseWins => {
        const cars = responseWins.carsWinners.map(win => getCar(win.id));
        Promise.all(cars)
          .then(responseCars => {
            const carsWinner = responseWins.carsWinners.map((win, i) => Object.assign(win, responseCars[i]));
            responseWins.carsWinners = carsWinner;
            Object.assign(this.status, responseWins);
            this.dispath('updateWinners', this.status);
          })
      });
  }

  changeSortWinners(fieldSort = 'id' as FieldSort): void {
    if (this.status.fieldSort === fieldSort) {
      this.status.orderSort = this.status.orderSort === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.status.fieldSort = fieldSort;
    }
    this.updateWinners();
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
        if (this.status.countCarsGarage == ((this.status.paginationGarage - 1) * 7) + 1
        && this.status.paginationGarage > 1) {
          this.status.paginationGarage -= 1;
        }
        this.updatePages();
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

  nextPaginationGarage(): void {
    if (this.status.countCarsGarage > this.status.paginationGarage * 7) {
      this.status.paginationGarage += 1;
      this.updateGarage();
    }
  }

  lastPaginationGarage(): void {
    if (this.status.paginationGarage > 1) {
      this.status.paginationGarage -= 1;
      this.updateGarage();
    }
  }

  nextPaginationWinners(): void {
    if (this.status.countCarsWinners > this.status.paginationWinners * 10) {
      this.status.paginationWinners += 1;
      this.updateWinners();
    }
  }

  lastPaginationWinners(): void {
    if (this.status.paginationWinners > 1) {
      this.status.paginationWinners -= 1;
      this.updateWinners();
    }
  }

  addImageCar(idCar: number, image: HTMLElement): void {
    Object.assign(this.imagesCars, { [idCar]: image });
  }

  async startDriveCar(car: Car): Promise<void> {
    const engine = await carStartStopEngine(car.id, 'started');
    this.startAnimationCar(car, engine);
    const driveMode = await carEngineDriveMode(car.id);
    await this.stopDriveCar(car);
    if (!driveMode.success) this.breakDriveCar(car);
  }

  private startAnimationCar(car: Car, engine: Engine): void {
    const imageCar = this.imagesCars[car.id];
    if (imageCar) {
      const animationCar = animation(imageCar, car.id, engine);
      Object.assign(this.animationCars, animationCar);
    }
  }

  async restartDriveCar(car: Car): Promise<void> {
    await this.stopDriveCar(car);
    this.resetAnimationCar(car);
  }

  async stopDriveCar(car: Car): Promise<void> {
    await carStartStopEngine(car.id, 'stopped');
    this.stopAnimationCar(car);
  }

  private stopAnimationCar(car: Car): void {
    const animationCar = this.animationCars[car.id];
    if (animationCar) {
      const idFrame = animationCar.idFrame;
      window.cancelAnimationFrame(idFrame);
    }
  }

  private resetAnimationCar(car: Car): void {
    this.imagesCars[car.id].style.left = '0px';
    this.imagesCars[car.id].style.transform = 'rotate(0deg)';
    delete this.animationCars[car.id];
  }

  breakDriveCar(car: Car): void {
    this.imagesCars[car.id].style.transform = 'rotate(180deg)';
  }

  async carsRace(): Promise<void> {
    this.status.game = 'start';
    this.dispath('game', this.status);
    const startCars = this.status.carsGarage.map(car => carStartStopEngine(car.id, 'started'));
    const engines = await Promise.all(startCars);
    this.status.carsGarage.forEach((car, i) => this.startAnimationCar(car, engines[i]));
    this.traceCars = this.status.carsGarage.map(el => el.id);
    const driveCars = this.status.carsGarage.map(car => this.raceCar(car));
    const driveCar = await this.raceCars(driveCars);
    this.status.winner = driveCar;
    this.dispath('winnerGame', this.status);
    await addWinner(driveCar.idCar, driveCar.time)
    this.updateWinners();
    await Promise.all(driveCars);
    this.status.game = 'stop';
    this.dispath('game', this.status);
  }

  private async raceCars(driveCars: Promise<Finish>[]): Promise<Finish> {
    return new Promise((resolve) => {
      Promise.race(driveCars)
        .then(driveCar => {
          if (!driveCar.success) {
            const indexCar = this.traceCars.findIndex(el => el === driveCar.idCar);
            this.traceCars.splice(indexCar, 1);
            delete this.animationCars[driveCar.idCar];
            driveCars.splice(indexCar, 1);
            resolve(this.raceCars(driveCars));
          }

          resolve(driveCar);
        })
    })
  }

  private async raceCar(car: Car): Promise<Finish> {
    const driveMode = await carEngineDriveMode(car.id);
    await this.stopDriveCar(car);
    if (!driveMode.success) this.breakDriveCar(car);
    return {
      success: driveMode.success,
      idCar: car.id,
      name: car.name,
      time: this.animationCars[car.id].time
    } as Finish
  }

  resetCarsRace(): void {
    this.animationCars = {};
    this.status.winner = {
      success: false,
      idCar: 0,
      name: '',
      time: 0
    } as Finish;
    this.status.game = 'restart';
    this.updateGarage()
  }
}