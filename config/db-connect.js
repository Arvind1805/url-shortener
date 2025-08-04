import mongoose from "mongoose";

export const connectToDB = async()=>{

  await mongoose.connect("mongodb://localhost:27017/url-db")  //connection url + database name 

  mongoose.set("debug",true);  // displays the background work done by mongoose methods inorder perform curd operations (uses mongodb operations only)
  const userSchema = mongoose.Schema({
    url : {type : String, required : true},
    shortCode : {type : String, required : true}
    // createdAt : {type : Date, default : Date.now}  instead of both middlewares and this createdAt we can upload timestamps
  }
  )
  const collection = mongoose.model("url-link",userSchema)  
  return collection;

}
                                                           
// ,{
//   timestamps : true     => this is used to set createdAt and updatedAt time 
// }

//using middleware to automate the updation of any value or any operation 

// userSchema.pre(['updateOne'],function(next){
//     this.set({createdAt : Date.now()})
//     next()
// }
// )




