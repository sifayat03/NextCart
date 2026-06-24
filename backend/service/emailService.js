const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});


// Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"NEXT CART" <${process.env.EMAIL_USER}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

async function sendWelcomeOtpEmail(userEmail, name, otp) {
    const subject = 'Your OTP for NEXT CART Registration';
    const text = `Hello ${name},\n\nYour OTP for completing your registration at NEXT CART is: ${otp}\n\nBest regards,\nThe NEXT CART Team`;
    const html = `<p>Hello ${name},</p><p>Your OTP for completing your registration at NEXT CART is: <strong>${otp}</strong></p><p>Best regards,<br>The NEXT CART Team</p>`;
    await sendEmail(userEmail, subject, text, html);
}

async function sendOrderConfirmation(userEmail, order) {
    const subject = 'Order Confirmation - NEXT CART';
    const text = `Hello,\n\nThank you for your order! Your order ID is ${order._id} and the total amount is $${order.totalAmount}.\n\nBest regards,\nThe NEXT CART Team`;
    const html = `<p>Hello,</p><p>Thank you for your order! Your order ID is <strong>${order._id}</strong> and the total amount is <strong>$${order.totalAmount}</strong>.</p><p>Best regards,<br>The NEXT CART Team</p>`;
    await sendEmail(userEmail, subject, text, html);
}

/*
async function sendRegistrationEmail(userEmail, name) {
    const subject = 'Welcome to NEXT CART!';
    const text = `Hello ${name},\n\nThank you for registering at NEXT CART. We're excited to have you on board!\n\nBest regards,\nThe NEXT CART Team`;
    const html = `<p>Hello ${name},</p><p>Thank you for registering at NEXT CART. We're excited to have you on board!</p><p>Best regards,<br>The NEXT CART Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Successful!';
    const text = `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe NEXT CART Team`;
    const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>The NEXT CART Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Failed';
    const text = `Hello ${name},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe NEXT CART Team`;
    const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The NEXT CART Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}*/

module.exports = {
    sendWelcomeOtpEmail,
    sendOrderConfirmation
};