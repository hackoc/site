export default async function (req, res) {
    fetch(process.env.SLACK_WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: req.query.email,
            ip_city: req.query.city
        })
    })
}