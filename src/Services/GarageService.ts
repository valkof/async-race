import { Car, CarQuery, CarResponse } from "../Interfaces/Types";

const host = 'http://127.0.0.1:3000';

const garage = `${host}/garage`;


export async function getCars(page = 1, limit = 7): Promise<CarResponse> {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    page: page,
    count: response.headers.get('X-Total-Count'),
    cars: await response.json()
  };
}

export async function createCar(body: CarQuery): Promise<Car> {
  const response = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  const car = await response.json() as Car;
  return car;
}