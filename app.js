const express = require('express');
const path = require('path');
const exphbs = require("express-handlebars");

const homeRoutes = require('./routes/home/main')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({ defaultLayout: 'home'}))
app.set('view engine', 'handlebars');
app.use('/', homeRoutes);



app.listen('5000', () => {
    console.log(`Server is running on port 5000`);
})