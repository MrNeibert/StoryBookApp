const express = require('express')
const dotenv = require('dotenv')

//Load config
dotenv.config({ path: './config/config.env'})


const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`App is listening on port ${PORT} and running in ${process.env.NODE_ENV} mode!`))