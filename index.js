const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fo0cp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 async function run () {
     try{

     }
     finally{

     }
 }
 run().catch(console.dir);



app.get('/' , (req , res ) =>{
    res.send('server is connected')
})

app.listen(port , ()=>{
    console.log('listening to the port' , port)
})