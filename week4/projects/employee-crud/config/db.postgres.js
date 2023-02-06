import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
    HOST: process.env.HOST,
    USER: process.env.PG_USER,
    PASSWORD: process.env.PG_PASSWORD,
    DB: process.env.PG_DB,
    dialect: process.env.PG_dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export default dbConfig;
// export default will export the dbConfig object as the default export

// What is pool in db config?

// max: maximum number of connection in pool
// min: minimum number of connection in pool
// acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
// idle: maximum time, in milliseconds, that a connection can be idle before being released