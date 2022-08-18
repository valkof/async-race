import { ItemService } from "../Services/ItemService";
import { RaceService } from "../Services/RaceService";

export type NamesOfCars = {
  cars: {
    brand: string;
    models: string[]
  }[]
}

export type Services = {
  Race: RaceService;
}

export type ServiceItem = {
  Item: ItemService;
}

export type DataCar = {
  name: string,
  color: string
}

export type Car = DataCar & {
  id: number
}

export type Cars = {
  countCarsGarage: string | null,
  carsGarage: Car[],
}

export type Engine = {
  velocity: number,
  distance: number
}

export type DriveMode = {
  success: boolean
}

export type Wins = {
  wins: number,
  time: number
}

export type Winner = Wins & {
  id: number
}

export type Winners = {
  countCarsWinners: string | null,
  carsWinners: Winner[]
}

export type CarWinner = Car & Winner

export type CarsWinners = {
  countCarsWinners: string | null,
  carsWinners: CarWinner[]
}

export type FieldSort = 'id' | 'wins' | 'time'

export type OrderSort = 'ASC' | 'DESC'

export type Status = {
  currentPage: string,
  paginationGarage: number,
  paginationWinners: number,
  fieldSort: FieldSort,
  orderSort: OrderSort,
  countCarsGarage: number,
  countCarsWinners: number,
  carsGarage: Car[],
  carsWinners: CarWinner[],
  newCar: DataCar,
  idOldCar: number,
  oldCar: DataCar,
  winner: Finish,
  game: 'start' | 'stop' | 'restart'
}

export type Finish = {
  success: boolean,
  idCar: number,
  name: string,
  time: number
}

export type ImageCars = {
  [idCar: number]: HTMLElement
}

export type Animation = {
  idFrame: number,
  time: number
}

export type AnimationCars = {
  [idCar: number]: Animation
}