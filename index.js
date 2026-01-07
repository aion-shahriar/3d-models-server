

const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://model-DB:ekB1jlIQia5rB16n@cluster0.3tedund.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const db = client.db('model-DB');
    const modelsCollection = db.collection('models');

    // get method
    // find
    // findOne

    app.get('/models', async(req,res)=> {

        const result = await modelsCollection.find().toArray(); 
        res.send(result);
    })

    app.get('/models/:id', async(req,res)=> {
        const {id}=req.params;
        console.log(id);

        const result = await modelsCollection.findOne({_id: new ObjectId(id)})

        res.send({
            success: true,
            result
        })
    })

    // post method
    // insertMany
    // insertOne

    app.post('/models', async(req,res)=> {
        const data = req.body;
        console.log(data);
        const result = modelsCollection.insertOne(data);

        res.send({
            success: true,
            result
        })
    })

    // put method
    // updateOne
    // updateMany

    app.put('/models/:id', async(req,res)=> {
        const {id} = req.params;
        const data = req.body;
        const objectId = new ObjectId(id);

        const filter = {_id: objectId};
        const update = {
            $set: data
        }

        const result = await modelsCollection.updateOne(filter,update);

        res.send({
            success: true,
            result
        })
    })

    // delete method
    // deleteOne
    // deleteMany

    app.delete('/models/:id', async(req,res) => {
        const {id} = req.params;

        const objectId = new ObjectId(id);
        const filter = {_id : objectId};

        const result = await modelsCollection.deleteOne(filter);
        res.send({
            success: true,
            result
        })
    })

    


    


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);









app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello', (req,res)=> {
    res.send("Hello")
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})







