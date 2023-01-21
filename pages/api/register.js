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

async function email (email, name) {
  const token = `Bearer ${process.env.MAIL_KEY}`;
  const res = await fetch('https://api.hackoc.org/mail/v1/authed/deliver/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({
      data: {
        firstName: name.split(' ')[0],
        email
      }
    })
  });
  const json = await res.json();
  console.log(json);
  return json;
}


export default async function handler(req, res) {
    const dbPromise = dbConnect();
  const { body, method } = req;

  // Extract the email and captcha code from the request body
  const { data, captcha } = body;

  if (method === "POST") {
    // If email or captcha are missing return an error
    if (!captcha || !data) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }

    try {
      // Ping the google recaptcha verify API to verify the captcha code you received
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();
      /**
       * The structure of response from the veirfy API is
       * {
       *  "success": true|false,
       *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
       *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
       *  "error-codes": [...]        // optional
        }
       */
      if (captchaValidation.success) {
        // Replace this with the API that will save the data received
        // to your backend
        const client = await dbPromise;
        const collection = client.db("primary").collection("signups");
        const existingRecord = (await collection.findOne({
          Email: data["Email"]
        }));
        if (existingRecord) return res.status(422).json({ message: "This email has already registered for Hack OC." });
        console.log(await collection.insertOne(data));
        client.close();
        // Return 200 if everything is successful
        try {
        await email(data["Email"], data["Full Name"]);
        } catch (err) {

      return res.status(422).json({ message: "We had trouble sending you an email. Please report this error." });
        }
        return res.status(200).send("OK");
      }

      return res.status(422).json({
        message: "Unproccesable request, Invalid captcha code",
      });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ message: "Something went wrong" });
    }
  }
  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("Invalid method. please use POST");
}
