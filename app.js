const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require ('./config/db.js')

//Load config
dotenv.config({ path: './config/config.env'})


connectDB()

const app = express()
//logging
if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}
//handlebars
app.engine('.hbs',exphbs.engine({defaultLayout: 'main',extname: '.hbs'}))
app.set('view engine', '.hbs')

//Static folder
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/', require ('./routes/index.js'))

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`App is listening on port ${PORT} and running in ${process.env.NODE_ENV} mode!`))