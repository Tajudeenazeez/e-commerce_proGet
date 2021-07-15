const bcrypt = require('bcryptjs')

const user = [

  {
    name: 'TAJUDEEN Omo',
    email: 'tajudeenomotayo3@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'OLawunmi Siki',
    email: 'dhikrullahmaryam@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Azeez Ope',
    email: 'azeezproto@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
]


module.exports = user