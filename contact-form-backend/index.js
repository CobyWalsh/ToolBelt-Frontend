const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
    const formData = req.body;
    console.log('Contact form submission:', formData);

    res.status(200).json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});