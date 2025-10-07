import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectToDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI + process.env.MONGODB_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log("✅ Connected to MongoDB");

  mongoose.set("debug", true);

  // this schema is for storing the url and shortcode 
  const userSchema = new mongoose.Schema({
    url: {
      type: String,
      required: true 
    },
    shortCode: {
      type: String, 
      required: true 
    },
    userId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'user-cred',
      required : true
    }
   },
   { 
    timestamps: true 
   });

  //this schema is for storing user details...
  const credentialSchema = new mongoose.Schema({
    username : {
      type  : String,
      required : true
    },
    email : {
      type : String,
      required : true,
      unique : true
    },
    password : {
      type : String,
      required : true
    }
  })


  const credCollection = mongoose.model("user-cred",credentialSchema);
  const collection = mongoose.model("url-link", userSchema);
  return {collection, credCollection};
}

                                                           
// ,{
//   timestamps : true     => this is used to set createdAt and updatedAt time 
// }

// using middleware to automate the updation of any value or any operation 

// userSchema.pre(['updateOne'],function(next){
//     this.set({createdAt : Date.now()})
//     next()
// }
// )




