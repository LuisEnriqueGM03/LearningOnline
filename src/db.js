
import pg from 'pg';
export { pool };
const { Pool } = pg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'learningonline',
    password: 'root',
    port: 5432,
});

