/* globals module */

let jwt = require('jwt-simple');
const encrypt = require("../utils/encryption");
let secret = "Secret unicorns";
const DEFAULT_IMAGE = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTqhN3-lNH2F8f_eCb0wBD650zauwEIBNsIyzgVHa1kJh72dGGjRw';

module.exports = function ({ data, validator }) {
    return {
        login(req, res) {
            //console.log(req.body);
            let postData = req.body;
            //let postDataObj = JSON.parse(postData);
            let username = postData.username;
            let password = postData.password;

            data.getUserByUsername(username)
                .then((user) => {
                    if (user) {
                        let hashPass = encrypt.generateHashedPassword(user.salt, password);
                        if (hashPass === user.hashPass) {
                            let token = jwt.encode(user, secret);

                            return res.status(200).json({
                                success: true,
                                body: {
                                    token: token,
                                    username: user.username,
                                    visitedSites: user.visitedSites
                                }
                            });
                        } else {
                            return res.status(400).json({ success: false, msg: 'Грешна парола!' });
                        }
                    } else {
                        return res.status(400).json({ success: false, msg: 'Грешно потребителско име!' });
                    }
                })
                .catch(error => {
                    return res.send(error);
                });
        },
        register(req, res) {
            let newUser = {};
            let propoerties = ['username', 'password'];

            let postData = req.body;
            //console.log(postData);
            //let postDataObj = JSON.parse(postData);

            propoerties.forEach(property => {
                if (!property || property.length < 0) {
                    res.status(411).json(`Missing ${property}`);
                }

                newUser[property] = postData[property];
            });

            let pass = postData.password;
            let salt = encrypt.generateSalt();
            newUser.salt = salt;
            let hashPass = encrypt.generateHashedPassword(salt, pass);
            newUser.hashPass = hashPass;
            newUser.visitedSites = [];

            // console.log(newUser);

            data.getUserByUsername(newUser.username).then((user) => {
                if (user) {
                    return res.status(400).send({ success: false, errMsg: 'Потребител с това потребителско име вече съществува!' });
                } else {
                    data.createUser(newUser)
                        .then((data) => {
                            res.status(201).send({ success: true, data })
                        })
                        .catch(err => {
                            return res.status(400).send({ success: false, errMsg: 'Не е създаден потребител!' });
                        });
                }
            });


        },
        getLoggedUser(req, res) {
            const token = req.headers.authorization;

            if (token) {
                let userInfo = jwt.decode(token.split(' ')[1], secret);
                let user = {
                    username: userInfo.username
                };

                res.status(200).json(user);
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Please provide token'
                });
            }
        }
    };
};