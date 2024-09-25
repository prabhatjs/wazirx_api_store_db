import pkg from "pg"
import "dotenv/config"
const {Pool}=pkg

const user=process.env.user;
const port=process.env.port;
const password=process.env.password;
const db=process.env.database;

export const pool=new Pool({
user:user,
host:'localhost',
port:port,
database:db,
password:password,
})
