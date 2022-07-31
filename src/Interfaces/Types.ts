import { RaceService } from "../Services/RaceService";

export type Settings = {
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

export type CarResponse = {
  page: number,
  count: string | null,
  cars: Car[],
}

export type Winner = {
  id: number,
  wins: number,
  time: number
}

export type WinnerResponse = {
  page: number,
  count: string | null,
  cars: Winner[]
}