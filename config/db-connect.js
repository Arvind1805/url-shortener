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

  const userSchema = new mongoose.Schema({
    url: { type: String, required: true },
    shortCode: { type: String, required: true }
  }, { timestamps: true });

  const collection = mongoose.model("url-link", userSchema);
  return collection;
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




