export default async function (req, res) {
    const { email, city } = req.body;
    const response = await fetch('https://api.airtable.com/v0/appYlvRWZObGXXGOh/Emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            records: [
                {
                    fields: {
                        Email: email,
                        City: city
                    }
                }
            ]
        })
    });    
    const data = await response.json();
    console.log(data);
    res.send('OK');
}