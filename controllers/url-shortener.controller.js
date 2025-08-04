import { collection } from "../app.js";

const urlShortenerController = (loadlinks) => async(req,res)=>{
  const links = await loadlinks();
  res.render("index",{links,host : req.headers.host})
}

const redirectURL =(loadlinks) => async(req,res)=>{
  if(req.params){
    console.log(req.params)
    const {shortcode} = req.params;
    const result = await collection.findOne({shortCode : shortcode})
    if(result){
      res.redirect(result.url)
    }else{
      console.log("no data found")
      res.status(400).send("data not found")
    }
  }
}

export {urlShortenerController , redirectURL}