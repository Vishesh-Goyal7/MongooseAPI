const exp = require('express')
const route = exp.Router()
const userInfo = require('os')
const auth = require('../JoiScripts/validate')
const control = require('../Controllers/controllers')

route.use(exp.json())

route.post('/signup', auth.joiSignUp, control.signUpUser)

route.post('/signin/creds', auth.joiSignInCred, control.signInUser)

route.get('/userProfile', auth.joiProfileToken, control.userProfile)

route.delete('/delete',auth.joiSignInCred, control.userDelete)

module.exports = route