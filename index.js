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

app.post('/send-handyman-email', async (req, res) => {
    const { name, address, phone, email, description } = req.body;

    const msg = {
        to: [process.env.TO_EMAIL, 'dexter@mybolohome.com'],
        from: process.env.FROM_EMAIL,
        subject: 'New Tech Service Request',
        text: `
        Name: ${name}
        Address: ${address}
        Phone: ${phone}
        Email: ${email}
        Work Needed: ${description}`,
        html: `
        <h2>New Tech Service Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Work Needed:</strong> ${description}</p>
        `
    };

    try {
        await sgMail.send(msg);
        res.status(200).send({ message: 'Request Sent Successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send({ message: 'Error sending request' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});