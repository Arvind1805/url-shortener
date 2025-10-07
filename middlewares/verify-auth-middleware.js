import jwt from 'jsonwebtoken'

export const verifyAuthentication = (req, res, next) =>{
  const token = req.cookies.access_token;

  if(!token){
    req.user = null;
    return next();
  }
  try{

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    console.log(decodedToken);
    return next();

  }catch(err){

    console.error(err);

    return res.redirect("/auth/login");
    // return res.send("token is expired");

  }

}