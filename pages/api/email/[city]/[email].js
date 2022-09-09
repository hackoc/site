export default function (req, res) {
    fetch(process.env.SLACK_WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: req.params.email,
            ip_city: req.params.city
        })
    })
}