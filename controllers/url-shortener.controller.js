import { collection } from "../app.js";

const urlShortenerController = (loadlinks) => async(req,res)=>{
  if(req.user){
    const links = await loadlinks(req.user.id); //passing the user specific id
    console.log(links); 
    return res.render("index",{links,host : req.headers.host})
  }
  else{
    res.render("index",{host : req.headers.host})
  }
  // const {isLoggedIn} = req.cookies;
  // if(isLoggedIn){
  // }
  // res.redirect("/auth/login");
  // console.log(isLoggedIn);
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