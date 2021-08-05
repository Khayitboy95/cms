const express = require('express');
const path = require('path');
const exphbs = require("express-handlebars");

const homeRoutes = require('./routes/home/index')
const adminRoutes = require('./routes/admin/index')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({ defaultLayout: 'home'}))
app.set('view engine', 'handlebars');

app.use('/', homeRoutes);
app.use('/admin', adminRoutes);



app.listen('5000', () => {
    console.log(`Server is running on port 5000`);
})