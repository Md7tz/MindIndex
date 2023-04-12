import { expect } from 'chai';
import knex from 'knex';
import dotenv from 'dotenv';
import dbConfig from '../config/knexfile.mjs';

dotenv.config();

describe('Database connection test', () => {  
    it('should connect to the database', async () => {
        const db = knex(dbConfig);
        await db.raw('SELECT 1');
        await db.destroy();
    }).timeout(5000);

    it('should throw an error if unable to connect to the database', async () => {
        const invalidConfig = {
            client: 'pg',
            connection: {
                host: 'invalid-host',
                user: 'root',
                password: 'password',
                database: 'test_db',
                port: 1234,
            },
        };

        let error;

        try {
            const db = knex(invalidConfig);
            await db.raw('SELECT 1');
            await db.destroy();
        } catch (err) {
            error = err;
        }

        expect(error).to.exist;
    }).timeout(10000);
});
