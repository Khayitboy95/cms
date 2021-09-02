const express = require('express');
const path = require('path');
const exphbs = require("express-handlebars");
const homeRoutes = require('./routes/home/index');
const adminRoutes = require('./routes/admin/index');
const postRoutes = require('./routes/admin/posts');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const upload = require('express-fileupload');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cms', {useUnifiedTopology: true, useNewUrlParser: true}).then((db) => {
    console.log(`Mongo connected`);
}).catch((err) => {
    console.log(`err`);
});




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const { select } = require('./helpers/handlebars-helpers');
app.engine('handlebars', exphbs({ defaultLayout: 'home', helpers: {select: select}}))
app.set('view engine', 'handlebars');
app.use(upload());
app.use(methodOverride('_method'));

app.use('/', homeRoutes);
app.use('/admin', adminRoutes);
app.use('/admin/posts', postRoutes);



app.listen('5000', () => {
    console.log(`Server is running on port 5000`);
})