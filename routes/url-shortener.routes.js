import  {urlShortenerController}  from '../controllers/url-shortener.controller.js';
import  postURLshortener  from '../models/postURLshortener.models.js';
import  {redirectURL}  from '../controllers/url-shortener.controller.js';
import {Router} from 'express';
import { collection } from '../app.js';
import { deleteShortenUrl, postUpdateShortenUrl, updateShortenUrl } from '../controllers/update.Shortener.controller.js';

const router = Router();

const loadlinks = async(userId) =>{
  const data = await collection.find({userId})  //getting collections from the database
  console.log(data);
  return data;
}

router.get("/",urlShortenerController(loadlinks))

router.get("/:shortcode",redirectURL(loadlinks))

router.post("/",postURLshortener(loadlinks))

router.route("/edit/:id").get(updateShortenUrl).post(postUpdateShortenUrl)

router.route("/delete/:id").get(deleteShortenUrl)

//export default router also works
export {router as shortenerRoute}
