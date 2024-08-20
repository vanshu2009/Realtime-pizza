require("dotenv").config()
const express=require("express");
const path=require("path");
const app=express();
const ejs=require("ejs")
const expressLayout=require("express-ejs-layouts")
const PORT=process.env.PORT || 3000
const mongoose=require("mongoose")
const session=require("express-session")
const flash=require("express-flash")
const MongoDbStore=require("connect-mongo")
//Database connection
const url = "mongodb://localhost/pizzas";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database Connected...');
  })
  .catch(err => {
    console.log("Connection failed:", err);
  });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connection to the database is open.');
});
//session store
let mongoStore = MongoDbStore.create({
  mongoUrl: url, 
  collectionName: 'sessions'
});
//session config
app.use(session({
  secret:process.env.COOKIE_SECRET,
  resave:false,
  store:mongoStore,
  saveUninitialized:false,
  cookie:{maxAge:1000*60*60*24}
}))
app.use(flash())
app.use(express.json())
//assets
app.use(express.static('public'))

//set template engine
app.use(expressLayout)
app.set("views",path.join(__dirname,"/resources/views"))
app.set("view engine","ejs")
require("./routes/web")(app)

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})