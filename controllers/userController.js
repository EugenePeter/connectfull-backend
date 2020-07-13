const User = require("../models/UserModel");

const jwt = require("jsonwebtoken");

const tokenLasts = "1d";

exports.apiRegister = function (req, res) {
  let user = new User(req.body);
  user
    .register()
    .then(() => {
      res.json({
        token: jwt.sign(
          {
            _id: user.data._id,
            username: user.data.username,
            avatar: user.avatar,
          },
          process.env.JWTSECRET,
          { expiresIn: tokenLasts }
        ),
        username: user.data.username,
      });
    })
    .catch((regErrors) => {
      res.status(500).send(regErrors);
    });
};

exports.apiLogin = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      res.json({
        token: jwt.sign(
          {
            _id: user.data._id,
            username: user.data.username,
            avatar: user.avatar,
          },
          process.env.JWTSECRET,
          { expiresIn: tokenLasts }
        ),
        username: user.data.username,
        avatar: user.avatar,
      });
    })
    .catch(function (e) {
      res.json(false);
    });
};
