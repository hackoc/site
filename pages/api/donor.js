export default async function (req, res) {
    const response = await fetch('https://bank.hackclub.com/api/v3/organizations/hackoc/donations');
    const json = await response.json();
    res.send(
    	json.filter(a => {
    		const tags = a.transaction.tags.map(tag => tag.id);

    		if (tags.includes('tag_MGYTLx') && !tags.includes('tag_oWZTg3')) return a;
    	})
    	.sort(() => Math.random() - 0.5)[0]?.donor?.name
    );
}
