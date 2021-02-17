const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const {username, password, profile_pic} = req.body
        const db = req.app.get('db')
        const result = await db.find_user_by_username([username])
        const existingUser = result[0]
        if(existingUser){
            return res.status(409).send('Username is already taken!')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const createUser = db.create_user([username, hash, profile_pic])
        const user = createUser[0]
        req.session.user = {username: user.username, profile_pic: user.profile_pic}
        return res.status(201).send(req.session.user)
    },
    login: async (req, res) => {
        const {username, password} = req.body
        const foundUser= req.app.get('db').find_user_by_username([username])
        const existingUser = foundUser[0]
        if(!existingUser){
            return res.status(401).send('User not found. Please register these credentials or try a different set of credentials.')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated){
            return res.status(403).send('Incorrect username or password!')
        }
        req.session.user = {username: user.username}
        return res.send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        return res.sendStatus(200)
    },
    getUser: async (req, res) => {
        if(req.session.user){
            return res.status(200).send(req.session.user)
        } else {
            return res.status(404).send('Please login first!')
        }
    }
}