'use strict';

module.exports = {
  mongodb: {
    host: process.env.MONGO_HOST || 'mongo',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.APP_MONGO_DATABASE || 'flexoriginals',
    user: process.env.APP_MONGO_DATABASE_USERNAME || 'root',
    password: process.env.APP_MONGO_DATABASE_PASSWORD || '',
    name: 'mongodb',
    connector: 'mongodb',
    useNewUrlParser: true,
    connectionTimeout: 3000,
    useUnifiedTopology: true,
  },
  emailDs: {
    name: 'emailDs',
    connector: 'mail',
    transports: [
      {
        type: 'smtp',
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        tls: {
          rejectUnauthorized: true,
        },
        auth: {
          user: process.env.APP_EMAIL_ID || 'dummy@gmail.com',
          pass: process.env.APP_EMAIL_PASSWORD || 'dummy',
        },
      },
    ],
  },
};
