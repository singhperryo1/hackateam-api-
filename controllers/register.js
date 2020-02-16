const date = require('date-and-time');

const handleRegister = (req, resp, db, bcrypt) => {
	const { email, firstname, lastname, password } = req.body ; 

	if (!lastname || !firstname || !email || !password ) {
		return resp.status(400).json("Incorrect Submission") ; 
	}

	const hash = bcrypt.hashSync(password, 10) ; 

	db.transaction(trx => {
		trx.insert({
			hash: hash, 
			email: email
		})
		.into('register')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert ({
				email: loginEmail[0], 
				firstname: firstname,
				lastname: lastname,  
				joined: date.format(new Date(), 'DD-[MM]-YYYY')  
			})
			.then(users => {
				resp.json(users[0]) ; 
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => resp.status(400).json('unable to register'))
}
module.exports = {
	handleRegister: handleRegister
} ; 