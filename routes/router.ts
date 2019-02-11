import { Router, Request, Response } from "express";
import Server from "../classes/server";

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

export default router;