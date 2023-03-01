export default async function scanner (req, res) {
    console.log(req.query, req.params);
    res.send("OK");
}