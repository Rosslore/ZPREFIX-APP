const knex = require('knex');
const config = require('../../knexfile');
module.exports = knex(config.development);

//importing conifg file from knexfile.js and initializing knex with the development object from the config file and exporting it to be used in other files.