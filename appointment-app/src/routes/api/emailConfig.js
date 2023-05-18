import nodemailer from 'nodemailer';
//HERE TEMPORARILY
// Create a transporter object with gmail configuration
// Google removed it's allow less secure apps setting so we're using outlook now :FRICK:
//this is private bc obv password 
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'mslwitsbookingsystem@outlook.com',
    pass: 'book2meet'
  }
});

export async function sendEmail(clientEmail, email, eventStart, eventEnd) {
  // This is the email that will be sent
  const mailOptions = {
    from: 'mslwitsbookingsystem@outlook.com',
    to: clientEmail,
    subject: 'Booking with ' + email,
    text: 'Your booking has successfully been created with ' + email + 
    ' at ' + eventStart + ' to ' + eventEnd
  };

  // Send the email using the transporter object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error occurred while sending email:', error);
    } else {
      console.log('Email sent successfully!', info.response);
    }
  });
}