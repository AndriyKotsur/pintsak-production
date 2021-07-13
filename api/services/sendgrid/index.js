const sendgridMail = require('@sendgrid/mail')
const { mailInfo } = require('../../config')

sendgridMail.setApiKey(mailInfo.secretKey)

const sendMail = ({ toEmail = 'kotsurandriy@gmail.com', fromEmail = mailInfo.defaultEmail, subject, data }) => {
	const content = {
		to: toEmail,
		from: fromEmail,
		subject,
		html: data,
	}

	return sendgridMail.send(content)
}

module.exports = { sendMail }
