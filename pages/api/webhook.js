export default async function (req, res) {
    const response = await fetch('http://mail.hackoc.org/v1/unauthed/subscribe/webhook').then(response => response.text());
    res.send(response);
}