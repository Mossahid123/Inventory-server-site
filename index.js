const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fo0cp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db('inventory').collection('product');
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const products = await productCollection.findOne(query);
            res.send(products);
        })
        app.get('/myproduct', async(req, res)=>{
            const email = req.query.email
            console.log(email);
            const query = {email}
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products)
            
        })
        app.post('/product' , async(req ,res) =>{
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            res.send(result) 
        })
        app.delete('/product/:id', async(req ,res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await productCollection.deleteOne(query);
            res.send(result)
        })
        
        // Update quantity

        app.put("/product/:id", async (req, res) => {
            const id = req.params.id;
            const updatedStock = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDocument = {
                $set: updatedStock
            };
            const result = await productCollection.updateOne(
                filter,
                updateDocument,
                options
            );
            console.log("updating", id);
            res.send(result);
        });

    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('server is connected')
})

app.listen(port, () => {
    console.log('listening to the port', port)
})