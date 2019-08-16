module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/govt_library',
    migrations: {
      directory: './migrations'
    },
    useNullAsDefault: true,
    seeds: {
      directory: './seeds'
    }
  },
  
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './migrations'
    },
    useNullAsDefault: true
  }
  
}
