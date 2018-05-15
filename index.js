const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.use(express.static("public"));

app.get('/',(request, response) => {
    response.render("home");
});

app.listen(3000);