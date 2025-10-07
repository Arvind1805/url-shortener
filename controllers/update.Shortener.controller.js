import mongoose from "mongoose";
import { collection } from "../app.js";

export const updateShortenUrl = async(req,res) =>{
  if(req.params){
    const id = req.params.id;
    const userIdCheck = await collection.findOne({_id : id})
    console.log(userIdCheck)
    res.render("updateDetails",{dataId : req.params.id, url : userIdCheck.url, shortCode : userIdCheck.shortCode})
  }
}

export const postUpdateShortenUrl = async(req,res) =>{
  const urlUpdateId = req.params.id;
  console.log("entered here to update :", urlUpdateId)
  if(urlUpdateId){
    const {url, shortCode} = req.body;
    const totalAffect = await collection.updateOne({ _id : new mongoose.Types.ObjectId(urlUpdateId)},{$set:{url : url, shortCode : shortCode}})
    console.log(totalAffect)
    console.log("updated successfully...")
    res.status(200).redirect("/")
  }
  else{
    res.send("Something went wrong...");
  }
}

export const deleteShortenUrl = async(req, res) =>{
  const urlDeleteId = req.params.id;
  if(urlDeleteId){
    const isIdValid = await collection.find({ _id : new mongoose.Types.ObjectId(urlDeleteId)})
    if(isIdValid){
      await collection.deleteOne({ _id : new mongoose.Types.ObjectId(urlDeleteId)})
    }
  }
  res.status(200).redirect("/")
}