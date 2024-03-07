// Update with your config settings.
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: "./data/migrations",
      tableName: "dbmigrations",
    },
    seeds: { directory: "./data/seeds" },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "dbmigrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  testing: {
    client: "pg",
    connection: process.env.DATABASE_TEST,
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "dbmigrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
