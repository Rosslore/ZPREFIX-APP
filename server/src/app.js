const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('../knexfile')["development"]);
const app = express();
const bcrypt = require('bcrypt');
const port = 8080;



app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

///////// ROUTES /////////
// const userRouter = require('./routes/user');
// const inventoryRouter = require('./routes/inventory');
// app.use('/user', userRouter);
// app.use('/inventory', inventoryRouter);

const encryptPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

const comparePassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (error) {
        console.log(error)
        throw "Error comparing password";
    }
}

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await knex('user')
            .select('*')
            .where('username'=== username)
            .first();
        if (!user) {
            res.status(401).send({ message: 'Invalid username' });
            return;
        }
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            res.status(401).send({ message: 'Invalid password' });
            return;
        }
        //send jwt token here
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // expires in 1 hour
        });


        
        res.status(200).send({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error logging in' });
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hash = await encryptPassword(body.password);
    try {
        const user = await knex('user')
            .select('*')
            .where('username', username)
            .first();
        if (user) {
            res.status(400).send({ message: 'Username already exists' });
            return;
        }
        await knex('user').insert({
            username,
            password: hash,
        });
        res.status(200).send({ message: 'Registration successful' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error registering' });
    }
});



//simple route
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to Supra Inventory Management System(SIMS) API' });
});


//// READ //////
app.get('/inventory', (req, res) => {
    knex('inventory')
        .select('*')
        .then((data) => {
            let responseData = data.map((item) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                quantity: item.quantity,
            }));
            res.status(200).send(responseData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: 'Error retrieving inventory' });
        });
});

// get inventory by id
app.get('/inventory/:id', (req, res) => {
    knex('inventory')
        .select('*')
        .where('id', req.params.id)
        .then((data) => {
            let responseData = data.map((item) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                serial_number: item.serial_number,
                user_id: item.user_id,
            }));
            res.status(200).send(responseData);
        })
});

//get users
app.get('/users', (req, res) => {
    knex('user')
        .select('*')
        .then((data) => {
            let responseData = data.map((item) => ({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                password: user.password,
                email: user.email,
                role: user.role,
            }));
            res.status(200).send(responseData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: 'Error retrieving users' });
        });
});

// get user by id
app.get('/users/:id', (req, res) => {
    knex('user')
        .select('*')
        .where('id', req.params.id)
        .then((data) => {
            let responseData = data.map((item) => ({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                password: user.password,
                email: user.email,
                role: user.role,
            }));
            res.status(200).send(responseData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({message: 'Error retrieving user'});
        })
});





///// CREATE //////


module.exports = app;