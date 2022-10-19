import Dexie from "dexie";

export const db = new Dexie('todoListDB');
db.version(1).stores({
    tasks: '++id, title, description, completed'
});