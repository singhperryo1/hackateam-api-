
const handleRegister = (req, resp, db, bcrypt) => {
	const { email, firstname, lastname, password } = req.body ; 

	if (!lastname || !firstname || !email || !password ) {
		return resp.status(400).json("Incorrect Submission") ; 
	}

	const hash = bcrypt.hashSync(password, 10) ; 
	console.log(hash) ; 

	db.transaction(trx => {
		trx.insert({
			password: hash, 
			email: email,
			firstname: firstname,
			lastname: lastname
		})
		.into('register')
		.returning('email')
		.then(loginEmail => {
			return trx('login')
			.returning('*')
			.insert ({
				email: loginEmail[0], 
				password: hash
			})
			.then(users => {
				resp.json(users[0]) ; 
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => {
		console.error(err);
		resp.status(400).json('unable to register')
	})
}
module.exports = {
	handleRegister: handleRegister
} ; 