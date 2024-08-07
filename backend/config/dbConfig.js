import knex from "knex";
import bookshelf from "bookshelf";
import env from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envFile = resolve(__dirname, "env", ".env");

env.config({ path: envFile });

const knexInstance = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  },
});

const bookshelfInstance = bookshelf(knexInstance);

export { knexInstance, bookshelfInstance };
