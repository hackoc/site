import ShortUniqueId from "short-unique-id";
import fetch from "node-fetch";

const sleep = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 350);
});

export function dbConnect () {
    return new Promise((resolve, reject) => {
    const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    if (err) return reject(err);
  resolve(client);
  // perform actions on the collection object
});
    });

}


export default async function handler(req, res) {
    if (req.body.token !== process.env.PRIVATE_TOKEN) return res.send("oops");
    const client = await dbConnect();


    
        const collection = client.db("primary").collection("scrapbook");
        
        const query = req.body.id ? {
            shortId: req.body.id
            
        } : {
            discord: req.body.discord
        }

        const response = (await collection.deleteOne(query));
        res.json({
            ok: true
        });
        client.close();
}
