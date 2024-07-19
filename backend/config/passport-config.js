import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import bookshelf from 'bookshelf';

import env from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envFile = resolve(__dirname, "env", ".env");

env.config({ path: envFile });

// Define bookshelfInstance
const knexInstance = knex({
  client: 'pg',
  connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE
  }
});

const bookshelfInstance = bookshelf(knexInstance);

// Define createBookshelfOf function
async function createBookshelfOf(tbl) {
  return bookshelfInstance.Model.extend({
      tableName: tbl,
      idAttribute: "id"
  });
}


const initializePassport = () => {
  const authenticateUser = async (email, password, done) => {
    try {
        const Users = await createBookshelfOf("user_accounts");
        const user = await new Users({ email: email }).fetch();
        
        if (!user) {
            return done(null, false, { message: "Invalid email" });
        }
        
        const isValidPassword = await bcrypt.compare(password, user.get('hash_password'));
        if (!isValidPassword) {
            return done(null, false, { message: "Invalid password" });
        }
        
        return done(null, user.toJSON());
    } catch (error) {
        return done(error);
    }
};

passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const Users = await createBookshelfOf("user_accounts");
        const user = await new Users({ id: id }).fetch();
        if (!user) {
            return done(new Error("User not found"));
        }
        done(null, user.toJSON());
    } catch (error) {
        done(error);
    }
});
}

const signJWT = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export { initializePassport, signJWT };