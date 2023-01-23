import { Transform } from 'stream';
import { pipeline } from 'stream/promises';
import { WebSocketServer, createWebSocketStream } from 'ws';
import { exеcuteCommand } from './commands.js';
import { finishApp} from './utils.js';

export const wsServerStart = (port: number) => {
  const wsServer = new WebSocketServer({ port, perMessageDeflate: false });
  console.log('Websocket parameters', wsServer.address());

  process.on('SIGINT', () => finishApp(wsServer));

  wsServer.on('connection', async (ws) => {
    const duplex = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false});

    const transformStream = new Transform({
    transform(data, _, callback) {
      exеcuteCommand(data, callback) 
    },
    decodeStrings: false,
    encoding: 'utf8'})

    await pipeline(duplex, transformStream, duplex)
  });

  wsServer.on('close', () => {
    process.exit();
  });
};
