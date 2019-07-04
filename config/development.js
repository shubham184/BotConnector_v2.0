module.exports = {
  db: {
    host: '127.0.0.1',
    port: '27017',
    dbName: 'gromit-test',
  },
  server: {
    port: 8082,
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    auth: '',
    db: 14,
    options: {}, // see https://github.com/mranney/node_redis#rediscreateclient
  },
  base_url: 'http://localhost:8082',
  skillsBuilderUrl: 'http://localhost:5000/',
  "https": true,
  "keyfile": "gmclouddemo.westeurope.cloudapp.azure.com-key.pem",
  "certfile": "gmclouddemo.westeurope.cloudapp.azure.com-chain.pem"
}


/*
mongodb+srv://test123:Test123@clustermli-ory7l.azure.mongodb.net/test?retryWrites=true

*/