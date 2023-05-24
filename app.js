const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require ('express-session')
const connectDB = require ('./config/db.js')



//Load config
dotenv.config({ path: './config/config.env'})


// passsport config
require('./config/passport.js')(passport)


connectDB()

const app = express()
//logging
if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}
//handlebars
app.engine('.hbs',exphbs.engine({defaultLayout: 'main',extname: '.hbs'}))
app.set('view engine', '.hbs')

//session middleware
app.use(session({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: false,
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/', require ('./routes/index.js'))
app.use('/auth', require ('./routes/auth'))

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`App is listening on port ${PORT} and running in ${process.env.NODE_ENV} mode!`))