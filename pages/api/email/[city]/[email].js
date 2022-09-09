export default function (req, res) {
    fetch('https://hooks.slack.com/workflows/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', {
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