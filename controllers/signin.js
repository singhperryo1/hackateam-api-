
const handleSignIn = (db, bcrypt) => (req, resp) => {
	const{email, password} = req.body ; 

	if(!email || !password) {
		return resp.status(400).json('Incorrect Submission') ; 
	}


	db.select('email','password').from('register')
	.where('email', '=', email)
	.then(data => {

		const isValid = bcrypt.compareSync(password, data[0].password) ; 
		if(isValid) {
			return db.select('*').from('register')
			.where('email', '=', email)
			.then(user => {
				resp.json(user[0])
			})
			.catch(err => resp.status(400).json('unable to get user'))
		} 
		else
			resp.status(400).json('Sorry! Wrong Credentails!')

	})

	.catch(err => console.error(err)) ; 
}


module.exports = {
	handleSignIn: handleSignIn
}