const sendgridMail = require('@sendgrid/mail')
const { mailInfo } = require('../../../config')

sendgridMail.setApiKey(mailInfo.secretKey)

const sendMail = ({ toEmail = mailInfo.defaultEmail, fromEmail, subject, content }) => {
	const message = {
		to: toEmail,
		from: fromEmail,
		subject,
		html: content,
	}
	return sendgridMail.send(message)
}

module.exports = sendMail
