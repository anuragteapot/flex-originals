// eslint-disable-next-line no-undef
db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'mydatabase',
    },
  ],
});
