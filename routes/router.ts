import { Router, Request, Response } from "express";
import { Socket } from 'socket.io';
import Server from "../classes/server";
import { onlineUsers } from "../sockets/sockets";

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({ ok: true, mesaje: 'Todo esta bien!!' });
});

router.post('/mensajes', (req: Request, res: Response) => {
    const body = req.body.body;
    const from = req.body.from;
    const server: Server = Server.getInstance();
    server.socket.emit('mensaje-nuevo', { from, body });
    res.json({ ok: true, from, body });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const body = req.body.body;
    const from = req.body.from;
    const id = req.params.id;
    const server: Server = Server.getInstance();
    server.socket.in(id).emit('mensaje-privado', { from, body });
    res.json({ ok: true, body, from, id });
});

router.get('/usuarios', (req: Request, res: Response) => {
    const server: Server = Server.getInstance();
    server.socket.clients((err: any, clients: Socket) => {
        if (err) {
            return res.json({ ok: false, err });
        }
        res.json({ ok: true, clients });
    });
});

router.get('/usuarios/detalle', (req: Request, res: Response) => {
    res.json({ ok: true, users: onlineUsers.getUserList() });
});

export default router;