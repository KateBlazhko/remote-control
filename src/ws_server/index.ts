import { WebSocketServer } from 'ws';
import { ACTIONS } from './commands.js';
import { COMMANDS } from './constatnts.js';
import { mapStrArrayToNumArray } from './utils.js';

export const wsServerStart = (port: number) => {
  const wsServer = new WebSocketServer({ port });

  wsServer.on('connection', async (ws) => {
    ws.on('message', async (data) => {
      ws.send(data.toString('utf8'));
      const [commandName, ...commandValue] = data.toString('utf8').split(' ');

      await ACTIONS[COMMANDS[commandName as keyof typeof COMMANDS]](mapStrArrayToNumArray(commandValue));
    });
  });
};
