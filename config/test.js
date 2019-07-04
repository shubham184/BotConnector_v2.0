module.exports = {
  db: {
    host: 'localhost',
    port: 27017,
    dbName: 'gromit-test',
  },
  server: {
    port: 2424,
  },
  redis: {
    port: 6379,
    host: 'localhost',
    auth: '',
    db: 14,
    options: {}, // see https://github.com/mranney/node_redis#rediscreateclient
  },
  base_url: 'http://localhost:2424',
  skillsBuilderUrl: 'https://api.cai.tools.sap/build/v1/dialog',
  "https": true,
  "keyfile": "gmclouddemo.westeurope.cloudapp.azure.com-key.pem",
  "certfile": "gmclouddemo.westeurope.cloudapp.azure.com-chain.pem"
}
