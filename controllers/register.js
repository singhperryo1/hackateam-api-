const date = require('date-and-time');

const handleRegister = (req, resp, db, bcrypt) => {
	const {email,firstName, lastName, password} = req.body ; 

	if (!email || !password) {
		return resp.status(400).json("Incorrect Submission") ; 
	}

	const hash = bcrypt.hashSync(password) ; 
	db.transaction(trx => {
		trx.insert( {
			hash: hash, 
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert ({
				email: loginEmail[0], 
				firstName: firstName,
				lastName: lastName,  
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
}