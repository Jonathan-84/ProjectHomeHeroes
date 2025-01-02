var express = require('express');
const { authMiddleware } = require("./utils/auth");
// const session = require('express-session');
var app = express();
var path = require('path');
const sequelize = require('./config/connection');
const routes = require('./controllers');

// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// /// add express sessions language
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const sess = {
//   secret: 'UData',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use( authMiddleware);


// turn on connection to db and server
sequelize.sync({ alter: true  }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});