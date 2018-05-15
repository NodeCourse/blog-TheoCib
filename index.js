const express = require('express');
const Sequelize  = require('sequelize');
const app = express();
app.set('view engine', 'pug');
app.use(express.static("public"));

/*app.get('/',(request, response) => {
    response.render("home");
});*/

const db = new Sequelize('userTest', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = db.define('user', {
    fullname: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING }
});

User
    .sync()
    .then(() => {
        User.create({
            fullname: 'Jane Doe',
            email: 'jane.doe@gmail.com'
        });
    })
    .then(() => {
        User.create({
            fullname: 'John Doe',
            email: 'john.doe@gmail.com'
        });
    })
    .then(() => {
        return User.findAll();
    })
    .then((users) => {
        console.log(users);
    });

app.listen(3000);
