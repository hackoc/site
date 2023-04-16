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

    const uid = new ShortUniqueId({ length: 10 });

    
        const collection = client.db("primary").collection("scrapbook");
        
        const response = (await collection.insertOne({
            name: req.body.name,
            avatar: req.body.avatar,
            message: req.body.message,
            image: req.body.image,
            id: uid
            
        }));
        res.json({uid, object: response});
        client.close();
}
