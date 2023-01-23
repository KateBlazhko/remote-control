import { mouse, left, right, up, down, straightTo, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';
import internal from 'stream';
import { COMMANDS } from './constatnts.js';
import { mapStrArrayToNumArray } from './utils.js';

const checkScreenSize = async (value: number[]) => {
  const widthScreen = await screen.width()
  const heightScreen = await screen.height()
  const { x, y } = await mouse.getPosition();

  const [width, height] = value;

  if (height) {
    if ((x + width > widthScreen) || (y + height > heightScreen)) {
      console.log('Invalid drawing')
      return false
    }
  } else {
    if ((x + width > widthScreen) || (y + width > heightScreen)) {
      console.log('Invalid drawing')
      return false
    }
    if ((x - width < 0) || (y - width < 0)) {
      console.log('Invalid drawing')
      return false
    }
  }

  return true
}

const moveUp = async (value: number[]): Promise<void> => {
  const [moveOffset] = value;

  await mouse.move(up(moveOffset));
};

const moveDown = async (value: number[]): Promise<void> => {
  const [moveOffset] = value;

  await mouse.move(down(moveOffset));
};

const moveLeft = async (value: number[]): Promise<void> => {
  const [moveOffset] = value;

  await mouse.move(left(moveOffset));
};

const moveRight = async (value: number[]): Promise<void> => {
  const [moveOffset] = value;

  await mouse.move(right(moveOffset));
};

const drawRectangle = async (value: number[]): Promise<void> => {
  const [width, height] = value;
  if (await checkScreenSize(value)) {
    await mouse.move(right(width));
    await mouse.move(down(height));
    await mouse.move(left(width));
    await mouse.move(up(height));  
  }
};

const drawSquare = async (value: number[]): Promise<void> => {
  const [side] = value;

  if (await checkScreenSize(value)) {
    await mouse.move(right(side));
    await mouse.move(down(side));
    await mouse.move(left(side));
    await mouse.move(up(side));
  }
};

const drawCircle = async (value: number[]): Promise<void> => {
  const [radius] = value;
  const { x, y } = await mouse.getPosition();
  const NUMBER_POINTS = 360;

  if (await checkScreenSize(value)) {
    for (let deg = 0; deg <= NUMBER_POINTS; deg++) {
      const rad = (Math.PI / 180) * deg;
      const xPoint = x - radius + radius * Math.cos(rad);
      const yPoint = y + radius * Math.sin(rad);

      await mouse.move(straightTo({ x: xPoint, y: yPoint }));
    }
  }
};

const mousePosition = async (): Promise<string> => {
  const { x: xPoint, y: yPoint } = await mouse.getPosition();

  return `${xPoint},${yPoint}`;
};

const prntScrn = async (): Promise<string> => {
  const { x, y } = await mouse.getPosition();
  const SCR_SIZE = 200;

  const expectedRegion = new Region(
    x - (SCR_SIZE / 2) >= 0 ? x - (SCR_SIZE / 2) : 0,
    y - (SCR_SIZE / 2) >= 0 ? y - (SCR_SIZE / 2) : 0,
    SCR_SIZE,
    SCR_SIZE
  );

  await screen.highlight(expectedRegion);

  const expectedImageBGR = await screen.grabRegion(expectedRegion);
  const expectedImageRGB = await expectedImageBGR.toRGB();

  const image = new Jimp(expectedImageRGB);
  const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

  return buffer.toString('base64');
};

export const ACTIONS = {
  moveUp,
  moveDown,
  moveRight,
  moveLeft,
  drawRectangle,
  drawSquare,
  drawCircle,
  mousePosition,
  prntScrn,
};

export const exеcuteCommand = async (data: string, callback: internal.TransformCallback) => {
    console.log(data);

    const [commandName, ...commandValue] = data.split(' ');

    const result = await ACTIONS[COMMANDS[commandName as keyof typeof COMMANDS]](
      mapStrArrayToNumArray(commandValue)
    );

    if (result) {
      callback(null, `${commandName} ${result}`)
      return;
      
    } else {
      callback(null, data)
      return;
    }
}
