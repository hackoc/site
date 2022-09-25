export default async function (req, res) {
    const response = await fetch('http://mail2.hackoc.org/v1/webhook').then(response => response.text());
    res.send(response);
}