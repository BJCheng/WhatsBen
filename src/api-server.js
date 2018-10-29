import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send('Hello whatsapp clone!');
});

app.listen(port, () => {
	console.log(`Express app listening at port ${port}`);
});