import  {collection}  from '../app.js';

const postURLshortener = (loadlinks) => async(req,res)=>{
  if(req.user){
      const {url,shortCode} = req.body;
      console.log("posting the url");
      console.log(req.body)
  const result = await collection.findOne({shortCode,userId : req.user.id})
  if(result){
    console.log("duplicate values not allowed")
  }
  else{
      await collection.insertOne({url, shortCode,userId : req.user.id})
      console.log("Data inserted successfully")
      res.redirect("/")
  }
  }
  else{
    res.status(404).send("login to continue")
  }
}

export default postURLshortener;