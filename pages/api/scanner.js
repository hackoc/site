import { dbConnect } from "./register";

export default async function scanner (req, res) {
    const { data } = req.query;

    const dbPromise = dbConnect();

    const client = await dbPromise;
    const collection = client.db("primary").collection("users");
    const existingRecord = (await collection.findOne({
      Email: data["Email"]
    }));
    if (existingRecord) return res.status(422).json({ message: "This email has already registered for Hack OC." });
    console.log(await collection.insertOne(data));
    client.close();

    
    res.send("OK");
}