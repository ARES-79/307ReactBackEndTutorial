const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const users = {
    users_list :
    [
        {
            id : 'xyz789',
            name : 'Charlie',
            job: 'Janitor',
        },
        {
            id : 'abc123',
            name: 'Mac',
            job: 'Bouncer',
        },
        {
            id : 'ppp222',
            name: 'Mac',
            job: 'Professor',
        },
        {
            id: 'yat999',
            name: 'Dee',
            job: 'Aspring actress',
        },
        {
            id: 'zap555',
            name: 'Dennis',
            job: 'Bartender',
        }
    ]
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = users['users_list'];
    
    if (name != undefined){
        result = findUserByName(result, name);
    }
    if (job != undefined){
        result = findUserByJob(result, job)
    }
    result = {users_list: result};
    res.send(result);
    
});

const findUserByName = (userList, name) => {
    return userList.filter( (user) => user['name'] === name);
}

const findUserByJob = (userList, job) => {
    return userList.filter( (user) =>  user['job'] === job);
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
 });

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
       //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd['id'] = makeid(6);
    addUser(userToAdd);
    res.status(userToAdd).send(201).end();
   });

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function addUser(user){
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = users['users_list'].findIndex( (user) => user['id'] === id); 
    if (result === -1)
        res.status(404).send('Resource not found.');
    else{
        users['users_list'].splice(result, 1);
        res.status(204).end();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 