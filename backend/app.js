//Server generated
require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var connectDB = require('./config/db')
const cors = require("cors");
var fs = require('fs');
const PORT = process.env.PORT || 5000;


const app = express();
app.use(express.json());

// frontend bağlanma kısmı 
app.use(cors())

//database bağlanma 
connectDB();


// json verilerini gönderme işlemi 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send("Homepage");
})



// autoloading routes
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

app.listen(PORT, () =>
  console.log(`Server Started at Port ${PORT}`)
);
