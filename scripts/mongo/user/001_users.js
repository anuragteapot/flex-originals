db.createUser({
  user: process.env.APP_MONGO_USER,
  pwd: process.env.APP_MONGO_PASS,
  roles: [
    {
      role: 'readWrite',
      db: process.env.APP_MONGO_DB,
    },
  ],
});
