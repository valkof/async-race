import { DriveMode, Engine } from "../Interfaces/Types";

const host = 'http://127.0.0.1:3000';

const engine = `${host}/engine`;

export async function carStartStopEngine(idCar: number, status: 'started' | 'stopped'): Promise<Engine> {
  const response = await fetch(`${engine}?id=${idCar}&status=${status}`, {
    method: 'PATCH'
  });
  return await response.json() as Engine;
}

export async function carEngineDriveMode(idCar: number, status = 'drive'): Promise<DriveMode> {
  const response = await fetch(`${engine}?id=${idCar}&status=${status}`, {
    method: 'PATCH'
  });
  if (response.status >= 300) {
    console.log(`break ${idCar}`);
    return Promise.resolve({
      success: false
    });
  }
  return await response.json() as DriveMode;
}

export function animation(image: HTMLElement, idCar: number, engineCar: Engine) {
  let startTime = 0;
  const response = {
    idCar: idCar,
    idFrame: 0,
    time: 0
  }

  function step(timestamp: number) {
    if (startTime === 0) startTime = timestamp;
    const rangeTime = timestamp - startTime;
    const left = rangeTime / (+engineCar.distance / +engineCar.velocity) * (window.innerWidth - 70);
    image.style.left = `${left / window.innerWidth * 100}vw`;
    if (left < (window.innerWidth - 70)) {
      response.idFrame = window.requestAnimationFrame(step);
    }
    response.time = Math.floor(rangeTime / 10) / 100;
  }
  response.idFrame = window.requestAnimationFrame(step);

  return response;
}
  