import { Observer } from "../Abstract/Observer";
import { Car, Finish, NamesOfCars, Status } from "../Interfaces/Types";
import { animation, carEngineDriveMode, carStartStopEngine } from "./DriveService";
import { createCar, deleteCar, getCars, updateCar } from "./GarageService";
import { getInitSettingsFromJSON, getNamesOfCarsFromJSON } from "./getSettings";
import { getWinners } from "./WinnersService";

export class RaceService extends Observer {
  
  private namesOfCars = {} as NamesOfCars;

  private status = {} as Status;

  private imageCars = [] as {idCar: number, image: HTMLElement}[];

  private animationCars = [] as {idCar: number, idFrame: number, time: number}[];
  
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
        this.imageCars = [];
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
        if (this.status.countCarsGarage == ((this.status.paginationGarage - 1) * 7) + 1
        && this.status.paginationGarage > 1) {
          this.status.paginationGarage -= 1;
        }
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
    this.imageCars.push({
      idCar: idCar,
      image: image
    })
  }

  startAnimation(car: Car): void {
    carStartStopEngine(car.id, 'started')
      .then(engine => {
        const image = this.imageCars.find(el => el.idCar === car.id);
        if (image) {
          this.animationCars.push(animation(image.image, car.id, engine));
        }
        this.race(car);
        
      })
  }

  carStopAnimation(car: Car): void {
    carStartStopEngine(car.id, 'stopped')
      .then(() => {
        const indexFrame = this.animationCars.findIndex(el => el.idCar === car.id);
        let frame;
        if (indexFrame >= 0) frame = this.animationCars[indexFrame];
        if (frame) {
          window.cancelAnimationFrame(frame.idFrame);
          const imageCar = this.imageCars.find(el => el.idCar === car.id);
          if (imageCar) imageCar.image.style.left = '0px';
          this.animationCars.splice(indexFrame, 1);
        }
      })
  }

  carsRace(): void {
    const startCar = this.status.carsGarage.map(car => carStartStopEngine(car.id, 'started'));
    Promise.all(startCar).then((engineCars) => {
      this.status.carsGarage.forEach((car, i) => {
        const image = this.imageCars.find(el => el.idCar === car.id);
        if (image) {
          this.animationCars.push(animation(image.image, car.id, engineCars[i]));
        }
      })
      const driveCars = this.status.carsGarage.map(car => this.race(car));
      this.raceAll(driveCars)
        .then(driveCar => {
          console.log(driveCar);
        })
      
    })
  }

  private raceAll(driveCars: Promise<Finish>[]): Promise<Finish> {
    return new Promise((resolve) => {
      Promise.race(driveCars)
        .then(driveCar => {
          
          if (!driveCar.success) {
            const indexFrame = this.animationCars.findIndex(el => el.idCar === driveCar.idCar);
            this.animationCars.splice(indexFrame, 1);
            driveCars.splice(indexFrame, 1);
            resolve(this.raceAll(driveCars));
          }

          resolve(driveCar);
        })

    })
  }

  private async race(car: Car): Promise<Finish> {
    return carEngineDriveMode(car.id)
      .then(driveMode => {
        const indexFrame = this.animationCars.findIndex(el => el.idCar === car.id);
        let frame;
        if (indexFrame >= 0) frame = this.animationCars[indexFrame];
        
        if (frame) {
          if (!driveMode.success) {
            // console.log(`loose - ${frame.time}`);
            window.cancelAnimationFrame(frame.idFrame);
            const imageCar = this.imageCars.find(image => image.idCar === car.id);
            if (imageCar) {
              imageCar.image.style.transform = 'rotate(180deg)';
            }
            // this.animationCars.splice(indexFrame, 1);
          }
          return {
            success: driveMode.success,
            idCar: car.id,
            time: frame.time
          }
        }
        return {
          success: false,
          idCar: 0,
          time: 0
        }
      })
  }
}