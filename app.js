import express from 'express'
import {shortenerRoute}  from './routes/url-shortener.routes.js';
import {connectToDB} from './config/db-connect.js';

const app = express();

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())

//shortener route (express)
app.use(shortenerRoute);
app.set("view engine","ejs")

const PORT = process.env.PORT || 3000;

export const collection = await connectToDB();
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});

