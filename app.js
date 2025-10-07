import express from 'express'
import cookieParser from 'cookie-parser';
import {shortenerRoute}  from './routes/url-shortener.routes.js';
import {connectToDB} from './config/db-connect.js';
import {authRoutes} from './routes/auth.routes.js';
import {verifyAuthentication} from './middlewares/verify-auth-middleware.js'

const app = express();

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
app.use(cookieParser())

//this is the middleware for authentication (custom)
app.use((req, res, next) => {  // now it runs for every request and verifies the user using jwt , no need to check in database everytime
  const publicPaths = ['/auth/login', '/auth/register'];  
  if (publicPaths.includes(req.path)) {
    return next();
  }
  return verifyAuthentication(req, res, next);
});


app.use((req,res,next) =>{
  // console.log("entered for assigning")
  res.locals.user = req.user;  //after the verification completed it makes accessing the user details to entire pages (ejs, middlewares...)
  next();
})
//shortener route (express)
app.use(shortenerRoute);
//auth route
app.use(authRoutes);

app.set("view engine","ejs")

//handle unknown routes
app.use((req,res)=>{
  res.status(404).send("Page not found");
})


const PORT = process.env.PORT || 3000;

export const {collection,credCollection} = await connectToDB();
app.listen(PORT,'0.0.0.0', () => {
  console.log("Server is running on http://localhost:3000");
});

