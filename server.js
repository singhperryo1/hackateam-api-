const express = require('express') ; 

const cors = require('cors') ; 

const bodyParser = require('body-parser') ; 

const bcrypt = require('bcrypt') ; 

const knex = require('knex') ; 

const signin = require('./controllers/signin') ;

const register = require('./controllers/register') ; 



const db = knex ({

client: 'mysql', 
connection: {
	host: 'hackathon123.mysql.database.azure.com', 
	user: 'yan@hackathon123', 
	password: 'Hackathon123!', 
	database: 'hello', 
}
}) ; 

const app = express() ;


app.use(cors()) ;
app.use(bodyParser.json()) ; 

app.get('/', (req, resp) => {
	resp.send('This is the basic setup working')
}) ; 

app.post('/signIn', signin.handleSignIn(db, bcrypt)) ; 

app.post('/register', (req, resp) => { 
	register.handleRegister(req, resp, db, bcrypt)
}) ; 

app.listen(3000, () => {
	console.log(`app is running on port 3000`) ; 
})