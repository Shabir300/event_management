import { createConnection } from 'mysql';

export const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'urdu.com123',
    database: 'events_management',
});