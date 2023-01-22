import { WebSocketServer } from 'ws';
import { ACTIONS } from './commands.js';
import { COMMANDS } from './constatnts.js';
import { finishApp, mapStrArrayToNumArray } from './utils.js';

export const wsServerStart = (port: number) => {
  const wsServer = new WebSocketServer({ port, perMessageDeflate: false });
  console.log('Websocket parameters', wsServer.address());

  process.on('SIGINT', () => finishApp(wsServer));

  wsServer.on('connection', async (ws) => {
    ws.on('message', async (data) => {
      console.log(data.toString('utf8'));

      const [commandName, ...commandValue] = data.toString('utf8').split(' ');

      const result = await ACTIONS[COMMANDS[commandName as keyof typeof COMMANDS]](
        mapStrArrayToNumArray(commandValue)
      );

      if (result) {
        ws.send(`${commandName} ${result}`);
      } else {
        ws.send(data.toString('utf8'));
      }
    });
  });

  wsServer.on('close', () => {
    process.exit();
  });
};
