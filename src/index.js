const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3000;
const hbs = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');

//Connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Template Engine
app.engine('hbs', hbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// HTTP Logger
app.use(morgan('combined'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
