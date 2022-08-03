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

export type Car = {
  name: string,
  color: string,
  id: number
}

export type CarQuery = {
  name: string,
  color: string
}

export type CarsResponse = {
  countCarsGarage: string | null,
  carsGarage: Car[],
}

export type Winner = {
  id: number,
  wins: number,
  time: number
}

export type WinnerResponse = {
  countCarsWinners: string | null,
  carsWinners: Winner[]
}

export type Status = {
  currentPage: string,
  paginationGarage: number,
  paginationWinners: number,
  fieldSort: 'id' | 'wins' | 'time',
  orderSort: 'ASC' | 'DESC',
  countCarsGarage: number,
  countCarsWinners: number,
  carsGarage: Car[],
  carsWinners: Winner[],
  newCar: CarQuery,
  idOldCar: number,
  oldCar: CarQuery
}