import { mouse, left, right, up, down } from '@nut-tree/nut-js';

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

export const ACTIONS = { moveUp, moveDown, moveRight, moveLeft };
