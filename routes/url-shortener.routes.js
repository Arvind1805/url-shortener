import  {urlShortenerController}  from '../controllers/url-shortener.controller.js';
import  postURLshortener  from '../models/postURLshortener.models.js';
import  {redirectURL}  from '../controllers/url-shortener.controller.js';
import {Router} from 'express';
import { collection } from '../app.js';

const router = Router();

const loadlinks = async() =>{
  const data = await collection.find()  //getting collections from the database
  console.log(data);
  return data;
}

router.get("/",urlShortenerController(loadlinks))

router.get("/:shortcode",redirectURL(loadlinks))

router.post("/",postURLshortener(loadlinks))

//export default router also works
export {router as shortenerRoute}
