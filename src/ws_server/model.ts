import { ACTIONS } from './commands.js';

export type CommandsType = {
  mouse_left: keyof typeof ACTIONS;
  mouse_right: keyof typeof ACTIONS;
  mouse_up: keyof typeof ACTIONS;
  mouse_down: keyof typeof ACTIONS;
  draw_rectangle: keyof typeof ACTIONS;
  draw_square: keyof typeof ACTIONS;
  draw_circle: keyof typeof ACTIONS;
  mouse_position: keyof typeof ACTIONS;
  prnt_scrn: keyof typeof ACTIONS;
};
