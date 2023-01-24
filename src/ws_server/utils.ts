import { WebSocketServer } from 'ws';

export const mapStrArrayToNumArray = (array: string[]): number[] =>
  array.map((item) => (typeof Number(item) === 'number' ? Number(item) : 0));

export const finishApp = (wsServer: WebSocketServer) => {
  wsServer.clients.forEach((socket) => socket.terminate());
  wsServer.close();
  console.log('\nWebsocket server is closed');
};
