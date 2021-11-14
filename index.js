const express = require('express');
const app = express();
const connectToMongo = require('./Database/MongoCon');
const port = 5000;
const cors = require('cors');
// const Blog = require('./Database/Schema/Blog');
//Connecting to our MongoDB 
connectToMongo();
app.use(cors())
app.use(express.json())

app.use('/user',require('./Routes/user'));
app.use('/blog',require('./Routes/blog'));


app.listen(port, () => {
  console.log(`BlogSpace app listening at http://localhost:${port}`)
})