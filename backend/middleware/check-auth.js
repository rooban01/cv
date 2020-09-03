const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try{
   const token = req.headers.authorization.split(" ")[1];
    const decodedToken =  jwt.verify(token, process.env.JWT_KEY);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };  // on recupere les donnees a un  token affecté
   next();
   }catch(error){
     res.status(401).json({
     message: "vous n'êtes pas authentifié"
  });
}

}
