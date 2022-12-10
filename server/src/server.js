const app = require('./app');
const port = 8080;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})




















// const express = require('express');
// const app = express();
// const knex = require('knex')(require('./knexfile')["development"]);
// const cors = require('cors');
// const port = 8080;
// const bcrypt = require('bcrypt');

// // parse requests of content-type - application/json
// app.use(express.json());;
// // app.use(cors());

// // allow to server to accept request from different origin, in this case from localhost:8081
// var corsOptions = {
//     origin: 'http://localhost:8081'
// }

// // enable cors 
// app.use(cors(corsOptions));

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// // initial route
// app.get('/', (req, res) => {
//     res.send({ message: 'Welcome to Supra Inventory Management System(SIMS) API' });
// })

// // app.use('/inventory', require('./routes/inventory'));


