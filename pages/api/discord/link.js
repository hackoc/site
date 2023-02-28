export default function link (req, res) {
    const { data } = req.query;

    res.send(/*html*/`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Redirecting...</title>
            </head>
            <body>
                <p>Redirecting...</p>
                <p>If you are not redirected, click <a href="/registration/discord-success">here</a>.</p>
                <script>

                    const info = JSON.parse(atob('${data}'));

                    window.localStorage.setItem('hoc-discord-id', info.discordId);
                    window.localStorage.setItem('hoc-discord-tag', info.discordTag);
                    window.localStorage.setItem('hoc-discord-ts', Date.now());

                    window.location.href = "/registration/discord-success";

                </script>
            </body>
        </html>
    `);
}