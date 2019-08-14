
module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost/govt_library',
      migrations: {
        directory: './migrations'
      },
      useNullAsDefault: true
    }
  },

  production: {
    client: 'pg',
    connection: {
      filename: process.env.DATABASE_URL
    }
  }
}
