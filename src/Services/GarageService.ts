import { Car, CarQuery, CarsResponse } from "../Interfaces/Types";

const host = 'http://127.0.0.1:3000';

const garage = `${host}/garage`;


export async function getCars(page = 1, limit = 7): Promise<CarsResponse> {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    countCarsGarage: response.headers.get('X-Total-Count'),
    carsGarage: await response.json()
  };
}

export async function createCar(body: CarQuery): Promise<Car> {
  const response = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  return await response.json() as Car;
}

export async function updateCar(idCar: number, body: CarQuery): Promise<Car> {
  const response = await fetch(`${garage}/${idCar}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  return await response.json() as Car;
}

export async function deleteCar(id: number): Promise<Car> {
  const response = await fetch(`${garage}/${id}`, {
    method: 'DELETE'
  });
  return await response.json() as Car;
}