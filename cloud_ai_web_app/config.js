var config;

console.log("Node Environment:", process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  config = {
    mongodb: {
      host: '',
      db: '',
      options: {
        replicaSet: 'c1',
        replset: {
          rs_name: 'c1',
          loggerLevel: 'debug',
          socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
          }
        },
        server: {
          socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
          }
        },
        auto_reconnect: true
      }
    }
  };
} else {
  config = {
    mongodb: {
      host: '127.0.0.1',
      db: 'og-analytics',
      secondary: '127.0.0.1'
    }
  };
}

module.exports = config;
