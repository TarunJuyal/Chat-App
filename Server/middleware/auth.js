const { User } = require("../model/userModel");
const jwt=require("jsonwebtoken");

let auth = (req, res, next) => {
  let token = req.cookies.user_auth;
  jwt.verify(token, "secret", function (err, decode) {
    User.findOne({_id: decode, token: token }).populate("contacts").exec((err, user) => {
    if (err) throw err;
    if (!user) return res.json({ success: false, isAuth: false });
    req.user = user;
    next();
  });  
  });
};

module.exports = { auth };

