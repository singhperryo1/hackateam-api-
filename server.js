const express = require('express') ; 

const cors = require('cors') ; 

const bodyParser = require('body-parser') ; 

const bcrypt = require('bcrypt') ; 

const saltRounds = 10 ; 

const knex = require('knex') ; 

const signin = require('./controllers/signin') ;

const register = require('./controllers/register') ; 



const db = knex ({

client: 'mysql', 
connection: {
	host: 'hackateam.mysql.database.azure.com', 
	user: 'yan@hackateam', 
	password: 'hackathon123!', 
	database: 'hackateam'
}
})

const app = express() ;


app.use(cors()) ;
app.use(bodyParser.json()) ; 

app.get('/', (req, resp) => {
	resp.send('This is the basic setup woerking')
}) ; 

app.post('/signIn', signin.handleSignIn(db, bcrypt)) ; 

app.post('./register', (req, resp) => {
	register.handleRegister(req, resp, db, bcrypt)
}) ; 

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`) ; 
})