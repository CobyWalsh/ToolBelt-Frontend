const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', async (req, res) => {
    const { firstName, lastName, email, phone, city, address, message } = req.body;
    console.log('Contact form submission:', formData);

    const msg = {
        to: process.env.TO_EMAIL,
        from: process.env.FROM_EMAIL,
        subject: 'New Contact Form Submission',
        html: `
        <b>Name:</b> ${firstName} ${lastName}<br>
        <b>Email:</b> ${email}<br>
        <b>Phone:</b> ${phone}<br>
        <b>City:</b> ${city}<br>
        <b>Address:</b> ${address}<br>
        <b>Message:</b><br>${message}
        `
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({ success: true });
    } catch {
        console.error('SendGrid error:', error.response?.body || error)
        res.status(500).json({ success: false, error: 'Email could not be sent' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});