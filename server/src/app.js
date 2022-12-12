const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('../knexfile')["development"]);
const app = express();
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');



app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true // enable set cookie
}));

// parse requests of content-type - application/json
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: "userId",
    httpOnly: true,
    sameSite: 'strict',
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    },
}));




///////// ROUTES /////////
////// LOGIN ///////

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send({ message: "User logged out" });
    });


app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('Cookies: ', req.cookies)
    console.log('Session: ', req.session)
    console.log('Body: ', req.body)
    console.log('Signed Cookies: ', req.signedCookies)

    const user = await knex('users')
        .select('*')
        .where('username', username)
        .catch(err => { console.log(err) });
    if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (error, response) => {
            if (response) {
                req.session.user = user;
                console.log(req.session.user);
                res.send({ message: "User authenticated" });
            } else {
                res.send({ message: "Username or password incorrect" });
            }
        });
    }

})

app.get('/welcome', (req, res) => {
    if (req.session.user) {
        res.send({ message: "Welcome to the app" });
    } else {
        res.send({ message: "Please log in" });
    }
});

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

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await knex('users')
//             .select('*')
//             .where('username', username)
//             console.log(user)
//         const passwordMatch = await comparePassword(password, user[0].password);
//         if (!passwordMatch) {
//             res.status(401).send({ message: 'Invalid password' });
//             console.log(passwordMatch)
//             return;
//         };

//         res.status(200).send({ message: 'Successful login', user: { username: user[0].username, email: user[0].email, id: user[0].id }});
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Error logging in' });
//     }
// });
////////CREATE USER////////
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hash = await encryptPassword(password);
    try {
        const user = await knex('users')
            .select('*')
            .where('username', username)
        if (user) {
            res.status(400).send({ message: 'Username already exists' });
            return;
        }
        await knex('users').insert({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email,
            username: req.body.username,
            password: hash
        });

        res.status(200).send({ message: 'Registration successful' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error registering' });
    }
});

////// CREATE INVENTORY ///////

app.post('/inventory', (req, res) => {
    const { name, description, quantity, user_id } = req.body;
    knex('inventory')
        .insert({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            user_id: req.body.user_id
        })
        .then(() => {
            res.status(200).send({ message: 'Inventory created' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: 'Error creating inventory' });
        });
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
//get inventory by user id
app.get('/inventory/user/:username', async (req, res) => {
    let username = req.session.username;
    if (username == req.params.username) {
        try {
            let items
            let userID = await knex('inventory')
                .select('*')
                .where('user_id', userID)
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
                }
                )
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Error retrieving inventory' });
        }
    }
    // knex('inventory')
    //     .select('*')
    //     .where('user_id', req.params.id)
    //     .then((data) => {
    //         let responseData = data.map((item) => ({
    //             id: item.id,
    //             name: item.name,
    //             description: item.description,
    //             quantity: item.quantity,
    //             serial_number: item.serial_number,
    //             user_id: item.user_id,
    //         }));
    //         res.status(200).send(responseData);
    //     })
});


//get users
app.get('/users', (req, res) => {
    knex('users')
        .select('*')
        .then((data) => {
            let responseData = data.map((user) => ({
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
    knex('users')
        .select('*')
        .where('id', req.params.id)
        .then((data) => {
            let responseData = data.map((user) => ({
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
            res.status(500).send({ message: 'Error retrieving user' });
        })
});





///// UPDATE /////
// update inventory
app.patch('/inventory/:id', (req, res) => {
    knex('inventory')
        .where('id', req.params.id)
        .update({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            serial_number: req.body.serial_number,
            user_id: req.body.user_id,
        })
        .then((data) => {
            res.status(200).send({ message: 'Inventory updated successfully' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: 'Error updating inventory' });
        });
});

// update user
app.patch('/users/:id', (req, res) => {
    knex('users')
        .where('id', req.params.id)
        .update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role,
        })
        .then((data) => {
            res.status(200).send({ message: `${req.body.username} updated successfully` });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: `Error updating ${req.body.username}` });
        });
});

//// DELETE /////
// delete inventory
app.delete('/inventory/:id', (req, res) => {
    knex('inventory')
        .where('id', req.params.id)
        .del()
        .then((data) => {
            res.status(200).send({ message: 'Inventory deleted successfully' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: 'Error deleting inventory' });
        });
});

// delete user
app.delete('/users/:id', (req, res) => {
    knex('users')
        .where('id', req.params.id)
        .del()
        .then((data) => {
            res.status(200).send({ message: `${req.body.username} deleted successfully` });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: `Error deleting ${req.body.username}` });
        });
});





module.exports = app;