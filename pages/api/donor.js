export default async function (req, res) {
    const response = await fetch('https://bank.hackclub.com/api/v3/organizations/hackoc/donations');
    const json = await response.json();
    res.send(json.filter(a => a.id != 'don_NqfGKdG').sort(() => Math.random() - 0.5)[0]?.donor?.name);
}