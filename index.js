const juice = require('juice');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const fs = require('fs');

// Function to inline CSS styles
const inlineStyles = (htmlContent) => {
  return juice(htmlContent);
};

// Function to load email template from file
const loadEmailTemplate = (templatePath, placeholders = {}) => {
  let template = fs.readFileSync(templatePath, 'utf8');
  for (const [placeholder, value] of Object.entries(placeholders)) {
    const regex = new RegExp(`{{\\s*${placeholder}\\s*}}`, 'g');
    template = template.replace(regex, value);
  }
  return template;
};

// Sample HTML email content
const htmlEmail = loadEmailTemplate('path/to/email_template.html', {
  username: 'John Doe',
  actionUrl: 'https://example.com/action'
});

// Inlining CSS styles in the HTML email
const inlinedHtmlEmail = inlineStyles(htmlEmail);

// Setup nodemailer transport here
const transporter = nodemailer.createTransport({
  // Transport configuration (e.g., SMTP)
});

// Sending the email with attachments
const mailOptions = {
  from: '"Your Name" <your.email@example.com>',
  to: 'recipient@example.com',
  subject: 'Example Email with Inlined CSS',
  html: inlinedHtmlEmail,
  attachments: [
    {
      filename: 'attachment.txt',
      content: fs.createReadStream('path/to/attachment.txt')
    }
  ]
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});
