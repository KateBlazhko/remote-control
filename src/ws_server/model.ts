import { ACTIONS } from './commands.js';

export type CommandsType = {
  mouse_left: keyof typeof ACTIONS;
  mouse_right: keyof typeof ACTIONS;
  mouse_up: keyof typeof ACTIONS;
  mouse_down: keyof typeof ACTIONS;
};
