const express = require('express');
const router = express.Router(); 
const { User } = require('../db/models');
const {signUpValidation, logInValidation} = require('../validation')
const bcrypt = require('bcryptjs')

router.post('/signup', async (req, res, next) =>{

    const {error} = signUpValidation(req.body);
    if(error) return res.send(error.details[0].message)


    const userExist = await User.findOne({ where: { userName: req.body.userName } });
    if(userExist) return res.send('Username is taken')
    

    const emailExist = await User.findOne({ where: { email: req.body.email } });
    if(emailExist) return res.send('Email already in use')

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    try {
        const user = await User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword

        })
        res.send(user)
        
    } catch (error) {
        next(error);
        
    }
})

router.post('/login', async (req, res, next) =>{

    const {error} = logInValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const emailExist = await User.findOne({ where: { email: req.body.email } });
    if(!emailExist) return res.status(400).send('Incorrect Email or password')

    const validPass = await bcrypt.compare(req.body.password, emailExist.password);
    if(!validPass) return res.status(400).send('Incorrect Email or password')

    res.send('Logged In')

    
})

router.post('/login', (req, res) => {

})

module.exports = router;