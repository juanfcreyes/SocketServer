import { Socket } from "socket.io";
import io from "socket.io";
import { UserList } from "../classes/user-list";
import { User } from "../classes/user";

export const onlineUsers = new UserList();

export const disconnect = (client: Socket, io: io.Server) => {
    client.on('disconnect', () => {
        onlineUsers.deleteUser(client.id);
        io.emit('usuarios-activos', onlineUsers.getUserList());
    });
}

export const proccessMessage = (client: Socket, io: io.Server) => {
    client.on('mensaje', (payload: {from:string, body: string}) => {
        io.emit('mensaje-nuevo', payload);
    });
}

export const configUser = (client: Socket, io: io.Server) => {
    client.on('configurar-usuario', (payload: {name:string}, 
        callback: Function) => {
        onlineUsers.updateName(client.id, payload.name);
        callback({
            ok: true,
            message: `Usuario ${payload.name}`
        });
        io.emit('usuarios-activos', onlineUsers.getUserList());
    });
}

export const connectClient = (client: Socket) => {
    onlineUsers.addUser(new User(client.id));
}

export const getOnlineUsers = (client: Socket, io: io.Server) => {
    client.on('obtener-usuarios-activos',() => {;
        io.in(client.id).emit('usuarios-activos', onlineUsers.getUserList());
    });
}