const express = require('express');
const Sequelize  = require('sequelize');
const app = express();
app.set('view engine', 'pug');
app.use(express.static("public"));

app.get('/',(request, response) => {
Post
    .findAll({include: [Vote]})
    .then(posts => response.render("home", {posts}));

});

//app.use(bodyParser.urlencoded({extended: true})); parser le body a partir du form (telecharcher npm install body-parser --save

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

const Post = db.define('post', {
    title:{
        type: Sequelize.STRING
    }
});

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

app.listen(3000);
