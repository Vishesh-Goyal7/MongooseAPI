const exp = require('express')
const app = exp()
const port = 6969
const authRoute = require('./Routes/Authorizations')

app.use(exp.json())

app.use('/api/data/', authRoute)

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})