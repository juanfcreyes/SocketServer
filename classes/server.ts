import express from 'express';
import socket from 'socket.io';
import http from 'http';
import { SERVER_PORT } from '../global/environment';
import * as socketsEvents from '../sockets/sockets';

export default class Server {
    
    public port: number;
    public socket: socket.Server;
    public httpServer: http.Server;
    public app: express.Application;
    private static instance: Server = new Server();

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app)
        this.socket = socket(this.httpServer);
        this.listenSockets()
    }

    public static getInstance(): Server {
        return this.instance;
    }

    public start(callback: Function) {
        this.httpServer.listen(this.port, callback);
    }

    private listenSockets() {
        this.socket.on('connection', (client) => {
            socketsEvents.connectClient(client);
            socketsEvents.configUser(client);
            socketsEvents.proccessMessage(client, this.socket);
            socketsEvents.disconnect(client);
        });
    }
}