export default {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'the-today-system',
      user:     'postgres',
      password: 'kvC9#GH59b8DWk'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
      stub: './migration.stub.ts'
    }
  }
};
