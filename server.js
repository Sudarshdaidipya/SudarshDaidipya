const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Endpoint to receive audience questions and send email to your Gmail
app.post('/api/audience-question', async (req, res) => {
  const { name, email, question } = req.body;
  if (!name || !email || !question) {
    return res.status(400).json({ error: 'All fields required' });
  }

  // Configure your Gmail SMTP
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sudarshdaidipya@gmail.com', // your Gmail
      pass: 'YOUR_APP_PASSWORD'          // use an App Password, not your Gmail password
    }
  });

  // Email content
  const mailOptions = {
    from: '"Portfolio Website" <sudarshdaidipya@gmail.com>',
    to: 'sudarshdaidipya@gmail.com',
    subject: 'New Audience Question from Portfolio',
    text: `Name: ${name}\nEmail: ${email}\nQuestion: ${question}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
