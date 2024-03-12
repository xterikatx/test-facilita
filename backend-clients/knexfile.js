module.exports = {
    development: {
      client: 'pg',
      connection: {
        user: 'postgres',
        host: 'localhost',
        database: 'facilitadb',
        password: 'admin',
        port: 5432
      },
      timezone: 'UTC-3',
      migrations: {
        tableName: 'knex_migrations',
        directory: __dirname + '/db/migrations'
      },
      seeds: {
        directory: __dirname + '/db/seeds'
      }
    }
  };
  