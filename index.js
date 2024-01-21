// const MongoClient = require("mongodb");
const mongoose = require("mongoose");


// const mongoose = require('mongoose');


const dotenv = require("dotenv")
dotenv.config();
const connectionString = process.env.ATLAS_URI || "";
const Port = process.env.PORT || 8080;



const hotelSchema = new mongoose.Schema({
  rating: { 
      type: Number,
      required: true,
  },
  desc: {
      type: String,
      required: true,
  },
  imgSrc: {
      type: Array,
      required: true,
  },price: { 
      type: Number,
      required: true,
  },
  date: {
      type: String,
      required: true,
  },
  title  : {
      type: String,
      required: true,
  },
});

const hotel = mongoose.model("hotel", hotelSchema);


const userSchema = new mongoose.Schema({
    phoneNumber:{
        type: Number,
        required: true,
    }, 
});

    
const User = mongoose.model("User", userSchema);

// Import the mongoose module
// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = connectionString;

// Wait for database to connect, logging an error if there is a problem

mongoose.connect(mongoDB)
  .then(() => console.log('Connected!'));

const express = require('express')
const app = express()
app.use(express.json())
app.get('/', function (req, res) {
res.send('Hello World')
})

app.get('/gethotels', async (req, res) =>{
    
  const data =  await hotel.find()
  // console.log(data)
  res.send(data)
  })

app.get('/get', async (req, res) =>{
    
    const data =  await Dog.find()
    // console.log(data)
    res.send(data)
    })
app.get("/hotels",(req,res)=>{
    const hotels = [
        {
          rating: "4",
          desc: "Beach and Sunset Views",
          imgSrc: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
            "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
            "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
          ],
          price: "20000",
          date: "15-20 May",
          title: "Hotel 0000",
        },
        {
          rating: "4",
          desc: "Beach and Sunset Views",
          imgSrc: [
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
          ],
          price: "30000",
          date: "25-20 May",
          title: "Hotel 3",
        },
        {
          rating: "4",
          desc: "Beach and Sunset Views",
          imgSrc: [
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
          ],
          price: "45000",
          date: "10-20 Oct",
          title: "Hotel 3",
        },
        {
          rating: "4",
          desc: "Beach and Sunset Views",
          imgSrc: [
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
            "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
            "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
          ],
          price: "20000",
          date: "15-20 May",
          title: "Hotel 1",
        },
    ]
    res.send(hotels)
})
app.post('/', function (req, res) {
    const dogObj = {
        name:"bob",
        breed:"br",
        age:3,
        isGoodBoy:true
    }
    const newDog = new Dog(dogObj);
    newDog.save()
    res.send('successfully uploaded thanks')
    })

app.post('/signup', async (req, res) =>{
    const {phoneNumber} = req.body
    const newUser = new User({phoneNumber})
    await newUser.save()
    res.status(200).json({message:"User created successfully",newUser})
})

app.post ('/login',async(req,res)=>{
    const {phoneNumber} = req.body
    const findUser= await User.findOne({phoneNumber})
    console.log(findUser)
    // const findUser=
    if(!findUser){
        res.status(400).json({message:"User not found"})
    }
    res.status(200).json({message:"User found",success:true,findUser})
})




app.listen(Port)
