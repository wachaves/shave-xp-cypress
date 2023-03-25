const bcrypt = require('bcrypt')
const Joi = require('joi')
const express = require('express')
const validator = require('express-joi-validation').createValidator({
    passError: true
})
const app = express()

app.use(express.json())

const { deleteUser, insertUser } = require('./db')

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    is_shaver: Joi.boolean().required(),
})

app.get('/welcome', function (req, res) {
    res.json({ message: 'Olá QAx' })
})

app.delete('/user/:email', async function (req, res) {
    console.log(req.params)
    const { email } = req.params
    await deleteUser(email)
    res.status(204).end()
})

app.post('/user', validator.body(userSchema), async function (req, res) {
    const { name, email, password, is_shaver } = req.body
    const hashPass = await bcrypt.hash(password, 8)

    const user = {
        name: name,
        email: email,
        password: hashPass,
        is_shaver: is_shaver
    }
    // debito técnico pq ainda não consegue validar o campo shaver da forma correta
    // foi descontinuado pois o campo is_shaver é booleano e com isso foi subistituído pelo validation joi schema
    
    // if (!user.name || !user.email || !user.password) {
    //     return res.status(400).json({ message: 'Every field is mandatory.' })
    // }

    // Acima obriga todos os campos sendo obrigatórios, e a baixo foram separados
    // if (!user.name) {
    //     return res.status(400).json({ message: 'Name is required.' })
    // }

    // if (!user.email) {
    //     return res.status(400).json({ message: 'Email is required.' })
    // }

    // if (!user.password) {
    //     return res.status(400).json({ message: 'Password is required.' })
    // }

    // if (!user.is_shaver) {
    //     return res.status(400).json({ message: 'Shaver is required.' })
    // }

    console.log(user)

    try {
        await deleteUser(user.email)
        const id = await insertUser(user)

        res.status(201).json({ user_id: id })
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro.', stack: error })
    }


})

app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).json({
            type: err.type, // will be "query" here, but could be "headers", "body", or "params"
            message: err.error.toString()
        });
    } else {
        // pass on to another error handler
        next(err);
    }
});

app.listen(5000)