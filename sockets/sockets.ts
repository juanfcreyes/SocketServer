import { Socket } from "socket.io";
import io from "socket.io";
import { UserList } from "../classes/user-list";
import { User } from "../classes/user";

export const onlineUsers = new UserList();

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        onlineUsers.deleteUser(client.id);
    });
}

export const proccessMessage = (client: Socket, io: io.Server) => {
    client.on('mensaje', (payload: {from:string, body: string}) => {
        io.emit('mensaje-nuevo', payload);
    });
}

export const configUser = (client: Socket) => {
    client.on('configurar-usuario', (payload: {name:string}, 
        callback: Function) => {
        onlineUsers.updateName(client.id, payload.name);
        
        callback({
            ok: true,
            message: `Usuario ${payload.name}`
        });
    });
}

export const connectClient = (client: Socket) => {
    onlineUsers.addUser(new User(client.id));
}