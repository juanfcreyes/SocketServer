import { User } from "./user";

export class UserList {

    private list: User[] = [];

    constructor() {}

    public addUser(user: User) {
        this.list.push(user);
        return user;
    }

    public updateName(id: string, name: string) {
        const user = this.getUser(id);
        if (user) { user.name = name };
    }

    public getUserList() {
        return this.list.filter(user => user.name !== 'sin-nombre');
    }

    public getUser(id:string) {
        return this.list.find(user => user.id === id);
    }

    public getUsersByRoom(room: string) {
        return this.list.filter(user => user.room === room);
    }

    public deleteUser(id: string) {
        const userTemp = this.getUser(id);
        this.list = this.list.filter(user => user.id !== id);
        return userTemp;
    }

}