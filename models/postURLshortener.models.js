import  {collection}  from '../app.js';

const postURLshortener = (loadlinks) => async(req,res)=>{
  const {url,shortCode} = req.body;
  const result = await collection.findOne({shortCode : shortCode})
  if(result){
    alert("duplicate values not allowed")
  }
  else{
      await collection.insertOne({shortCode : shortCode , url : url})
      console.log("Data inserted successfully")
  }

  res.redirect("/")
}

export default postURLshortener;