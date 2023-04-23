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
    const client = await dbConnect();
    
        const collection = client.db("primary").collection("scrapbook");
        
        const posts = (await collection.find().toArray());
        const registrations = (await client.db("primary").collection("users").find().toArray());
        const users = {};
        registrations.forEach(registration => {
            users[registration['Discord Tag']] = registration['Full Name']
        });
        res.json(posts.map(post => {
            if (users[post.name]) post.name = users[post.name];
            return post;
        }));
        client.close();
}
