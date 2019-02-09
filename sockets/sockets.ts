import { Socket } from "socket.io";
import io from "socket.io";

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}

export const proccessMessage = (client: Socket, io: io.Server) => {
    client.on('mensaje', (payload: {from:string, body: string}) => {
        io.emit('mensaje-nuevo', payload);
    });
}