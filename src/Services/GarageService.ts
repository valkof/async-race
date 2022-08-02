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

export async function updateCar(body: Car): Promise<Car> {
  const response = await fetch(`${garage}/${body.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: body.name,
      color: body.color
    }),
    headers: {'Content-Type': 'application/json'}
  });
  const car = await response.json() as Car;
  return car;
}

export async function deleteCar(id: number): Promise<Car> {
  const response = await fetch(`${garage}/${id}`, {
    method: 'DELETE'
  });
  return await response.json() as Car;
}