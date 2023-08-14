const mongoose = require('mongoose')
const mongo_URL = "mongodb+srv://adminayush:testest@cluster0.ggja7le.mongodb.net/gofoodmern?retryWrites=true&w=majority";
 const connectDB=  ()=>{
    mongoose.connect(mongo_URL, {useNewUrlParser: true})
    .then(async ()=>{
        console.log('MongoDB connected')
        const fetch_data= await mongoose.connection.db.collection("food_items");
        let data = await fetch_data.find({}).toArray();
        global.food_items=data;

        const foodCategory= await mongoose.connection.db.collection("foodCategory");
        let category= await foodCategory.find({}).toArray();
        global.food_Category=category;
        console.log("data is feteched");
       
    })
    .catch((err)=>console.log(err));
 }

 module.exports = connectDB;