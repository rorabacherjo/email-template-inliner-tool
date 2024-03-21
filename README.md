# email-template-inliner-tool

A Node.js library to inline CSS styles in HTML email templates and send emails using Nodemailer.

## Installation

Install the library via npm:

```bash
npm install email-template-inliner-tool
```

## Usage

```javascript
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
```

Replace `'path/to/email_template.html'` and `'path/to/attachment.txt'` with the actual paths to your email template and attachment file, respectively. Ensure that the email template contains placeholders like `{{ username }}` and `{{ actionUrl }}` if you intend to replace them dynamically.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE)
