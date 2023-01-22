import { mouse, left, right, up, down, Button, straightTo } from '@nut-tree/nut-js';
import readline from 'readline/promises';

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

  await mouse.move(right(width));
  await mouse.move(down(height));
  await mouse.move(left(width));
  await mouse.move(up(height));
};

const drawSquare = async (value: number[]): Promise<void> => {
  const [side] = value;

  await mouse.move(right(side));
  await mouse.move(down(side));
  await mouse.move(left(side));
  await mouse.move(up(side));
};

const drawCircle = async (value: number[]): Promise<void> => {
  const [radius] = value;
  const { x, y } = await mouse.getPosition();
  const NUMBER_POINTS = 360;

  for (let deg = 0; deg <= NUMBER_POINTS; deg++) {
    const rad = (Math.PI / 180) * deg;
    const xPoint = x - radius + radius * Math.cos(rad);
    const yPoint = y + radius * Math.sin(rad);

    await mouse.move(straightTo({ x: xPoint, y: yPoint }));
  }
};

const mousePosition = async (): Promise<string> => {
  const { x: xPoint, y: yPoint } = await mouse.getPosition();

  return `${xPoint},${yPoint}`;
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
};
