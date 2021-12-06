const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Jane Eyre',
    email: 'jane@test.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Atticus Finch',
    email: 'atticus@test.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Tom Sawyer',
    email: 'tom@test.com',
    password: bcrypt.hashSync('123456', 10),
  }
];

module.exports = users;