const express = require('express');
const Sequelize  = require('sequelize');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'pug');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); //parser le body a partir du form (telecharcher npm install body-parser --save

/*
app.get('/',(request, response) => {
Post
    .findAll({include: [Vote]})
    .then(posts => response.render("home", {posts}));

});
*/
const db = new Sequelize('user', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = db.define('user', {
    firstname: { type: Sequelize.STRING },
    lastname: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING }
});

app.get('/', (req,res) => {
   res.render('home')
});

app.get('/adduser', (req,res) => {
    res.render('adduser')
});

app.post('/adduser', (req,res) => {

    User
        .sync()
        .then(() => {
            User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
                }
            )
        })
        .then(()=>{
            res.redirect('/')
        })
});

/*
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
*/
const Post = db.define('post', {
    title:{
        type: Sequelize.STRING
    }
});
/*
Post
    .sync()
    .then(()=> {
        Post.create({
            title: "Petit post sympathique"
        })

});


const Vote = db.define('vote', {
    action: {
        type: Sequelize.ENUM('up','down')
    }
});

Post.hasMany(Vote);
Vote.belongsTo(Post);

Vote.sync();


app.post('/api/post/:postId/upvote', (req,res) =>{
    Vote
        .create({action: 'up', postId: req.params.postId})
        .then (() => res.redirect('/'))
});
*/
app.listen(3000);


